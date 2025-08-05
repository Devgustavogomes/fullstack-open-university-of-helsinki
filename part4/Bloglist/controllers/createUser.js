const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')



userRouter.get('/', async(request,response) => {
  const users = await User.find({})
  const populatedUsers = await Promise.all(
    users.map(user => user.populate('blogs'))
  )
  response.send(populatedUsers)
})


userRouter.post('/', async (request, response) => {
  const { username , name , password } = request.body

  if(password.length <= 2){
    response.status(400).send({ error: 'short password' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
    blogs: []
  })

  await user.save()

  response.send(user)
})

module.exports = userRouter