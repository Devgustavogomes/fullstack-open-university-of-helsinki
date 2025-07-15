const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('deleted')

  for (let blog of listHelper.listOfBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
    console.log('added')
  }
})

describe('verify an existing blog', () => {
  test('quantity of blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response)
    expect(response.body)
      .toHaveLength(listHelper.listOfBlogs.length)
  }, 100000)

  test('verify propriety id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('create a new post', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const newBlog = {
      title: 'testing',
      author: 'Gustavo Gomes',
      url: 'aaaaaaaaa',
      likes: 15
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await api.get('/api/blogs')
    expect(updatedBlogs.body).toHaveLength(initialBlogs.body.length + 1)
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Post sem likes',
      author: 'Gustavo',
      url: 'https://example.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('If dont have url or title', async () => {
    const newBlog = {
      author: 'Gustavo',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('delete', () => {
  test('invalid id blog', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const id = '5'
    await api
      .delete(`/api/blogs/${id}`)
      .expect(400)

    expect(initialBlogs.body).toHaveLength(initialBlogs.body.length)
  })
  test('deleted blog', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const id = initialBlogs.body[0].id
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const afterDelete = await api.get('/api/blogs')

    expect(afterDelete.body).toHaveLength(initialBlogs.body.length - 1)
  })
})

describe('change blogs', () => {
  test('non-existing blog', async () => {
    const id = '64d182b2c6fe2947307f1269'
    await api.put(`/api/blogs/${id}`).expect(404)
  })
  test('changing existing blog', async () => {
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id
    await api.put(`/api/blogs/${id}`).expect(200)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})