const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

let token
let userId

const createAndLoginUser = async () => {
  const passwordHash = await bcrypt.hash('password123', 10)
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
  const savedUser = await user.save()

  userId = savedUser._id
  const userForToken = { username: savedUser.username, id: savedUser._id }
  token = jwt.sign(userForToken, process.env.SECRET)
}

const resetDatabase = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await createAndLoginUser()

  const blogPromises = listHelper.listOfBlogs.map(blog => {
    return new Blog({ ...blog, user: userId }).save()
  })
  await Promise.all(blogPromises)
}

beforeEach(resetDatabase)

describe('verify an existing blog', () => {
  test('quantity of blogs', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    expect(response.body).toHaveLength(listHelper.listOfBlogs.length)
  })

  test('verify propriety id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('create a new post', async () => {
    const initial = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

    const newBlog = {
      title: 'testing',
      author: 'Gustavo Gomes',
      url: 'aaaaaaaaa',
      likes: 15,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const final = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    expect(final.body).toHaveLength(initial.body.length + 1)
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Post sem likes',
      author: 'Gustavo',
      url: 'https://example.com',
      user: userId
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('If dont have url or title', async () => {
    const newBlog = { author: 'Gustavo' }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('fails with 401 if no token is provided', async () => {
    const newBlog = {
      title: 'Should fail',
      author: 'No Auth',
      url: 'http://fail.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('delete', () => {
  test('invalid id blog', async () => {
    const initial = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

    await api
      .delete('/api/blogs/invalidid')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const final = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    expect(final.body).toHaveLength(initial.body.length)
  })

  test('deleted blog', async () => {
    const initial = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    const blogToDelete = initial.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const final = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    expect(final.body).toHaveLength(initial.body.length - 1)
  })
})

describe('change blogs', () => {
  test('non-existing blog', async () => {
    const id = new mongoose.Types.ObjectId()
    await api.put(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).expect(404)
  })

  test('changing existing blog', async () => {
    const blogs = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    const blogToUpdate = blogs.body[0]

    const updated = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updated)
      .expect(200)

    expect(result.body.likes).toBe(updated.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})