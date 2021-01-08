const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  const passwordHash = await bcrypt.hash('roootPwd101', 10)

  const user = new User({
    username: 'rooot',
    password: passwordHash
  })
  await user.save()
})

describe('GET request tests', () => {
  test('BLOGS: blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('BLOGS: all blogs are returned', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

  test('BLOGS: the unique identifier is named as id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  })

  test('USERS: users are reurned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('USERS: the unique identifier is named as id', async () => {
    const res = await api.get('/api/users')
    expect(res.body[0].id).toBeDefined()
  })
})

describe('POST request tests', () => {
  test('USERS: when there is initially one user in db, creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'TestUser2',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    console.log('usersAtEnd', usersAtEnd)
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    console.log('usernames', usernames)
    expect(usernames).toContain(newUser.username)
  })

  test('USERS: creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rooot',
      name: 'Superuser',
      password: 'superUserPwd1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('USERS: creation fails with password with less then 3 char and returns status code 400', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'pwdUser',
      name: 'Test User',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const resultEr = result.body.error
    expect(resultEr).toContain('password must be a minimum of 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('USERS: creation fails with a username with less then 3 char and returns status code 400', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'pw',
      name: 'Test User',
      password: '1225',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const resultEr = result.body.error
    console.log('resultEr', resultEr)
    expect(resultEr).toContain('username must be a minimum of 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('BLOG: a blog can be added by a user. Its verified to be app/json, and also verified in db', async () => {
    const res = await api.get('/api/users')
    const user = res.body[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const newBlog = {
      title: 'blog four',
      author: 'Daughter Doe',
      url: 'www.daughterdoeblogfour.com',
      likes: 3,
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('BLOG: blog without likes return value of zero likes, nothing else tested', async () => {
    const res = await api.get('/api/users')
    const user = res.body[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const newBlog = {
      title: 'blog five',
      author: 'Uncle Doe',
      url: 'www.uncledoeblogfour.com',
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length -1].likes).toBe(0)
  })

  test('BLOG: blog without title returns 400 bad request', async () => {
    const res = await api.get('/api/users')
    const user = res.body[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const newBlog = {
      author: 'Uncle Doe',
      url: 'www.uncledoeblogfour.com',
      likes: 3
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('BLOG: blog without url returns 400 bad request', async () => {
    const res = await api.get('/api/users')
    const user = res.body[0]
    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const newBlog = {
      title: 'blog five',
      author: 'Uncle Doe',
      likes: 6
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('BLOG: blog without authorization header fails with status code 401', async () => {
    const newBlog = {
      title: 'blog no header',
      author: 'Sam Doe',
      url: 'www.samdoeblog.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})