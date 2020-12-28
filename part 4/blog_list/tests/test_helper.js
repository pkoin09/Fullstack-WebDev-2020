const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog one',
    author: 'John Doe',
    url: 'www.johndoeblogone.com',
    likes: 7,
    userId: '5a422b3a1b54a676234d17f9'
  },
  {
    title: 'Blog two',
    author: 'Jane Doe',
    url: 'www.janedoeblogtwo.com',
    likes: 5,
    userId: '5a422ba71b54a676234d17fb'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Blog three',
    author: 'Son Doe',
    url: 'www.sondoeblogthree.com',
    likes: 2,
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(usr => usr.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}