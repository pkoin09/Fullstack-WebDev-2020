const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1, url: 1 })
  res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if(!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const id = req.params.id

  if(!id) {
    res.status(401).end()
  }

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blogToDel = await Blog.findById(req.params.id)

  if(user._id.toString() !== blogToDel.user.toString()) {
    return res.status(401).json({ error: 'You dont have right to delete this blog.' })
  }

  await Blog.findByIdAndRemove(id)
  res.status(204).end()
})

module.exports = blogsRouter