const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({})

  response.send(result)
})

blogRouter.post('/', async (request, response) => {

  const body = request.body

  const user = await User.findOne()
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if(!body.title || !body.url){
    response.status(400).end()
  }
  const savedBlog = await blog.save()

  user.notes = user.notes.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username:1, name:1 })
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.likes += 1
  const updatedBlog = await blog.save()

  response.status(200).json(updatedBlog)
})

module.exports = blogRouter