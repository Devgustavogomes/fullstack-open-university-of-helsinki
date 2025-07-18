const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const api = supertest(app)

beforeEach( async () => {
  await User.deleteMany({})
})


describe('error to create a new user' , () => {
  test('error username', async () => {
    const user = {
      username: 'de',
      name: 'gustavo',
      password: 'aaaa'
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })
  test('error password', async () => {
    const user = {
      username: 'devv',
      name: 'gustavo',
      password: 'aa'
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })
  test('create successful', async () => {
    const initialUsers = await User.countDocuments({})
    const user = {
      username: 'devv',
      name: 'gustavo',
      password: 'aaaa'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)

    const finalUsers = await User.countDocuments({})
    expect(finalUsers).toBe(initialUsers + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})