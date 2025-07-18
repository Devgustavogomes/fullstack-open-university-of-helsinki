const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({})

  response.send(result)
})


blogRouter.post('/', async (request, response) => {

  const body = request.body


  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if(!body.title || !body.url){
    return response.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username:1, name:1 })
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== user._id.toString()){
    response.status(401).send({ error: 'You do not have permission to modify this blog post.' })
  }

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