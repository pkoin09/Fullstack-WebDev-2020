const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')

const blogs = [ {
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0 },
{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0 },
{
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0 },
{
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0 },
{ _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0 },
{
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0 }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has no blogs, likes equals 0', () => {
    let blog = []
    const result = listHelper.totalLikes(blog)
    expect(result).toBe(0)
  })

  test('when list has only one blog, likes equals the likes of that blog', () => {
    let blog = []
    blog.push(blogs[0])
    const result = listHelper.totalLikes(blog)
    expect(result).toBe(7)
  })

  test('when list has many blogs, likes equals the sum of likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  const asBlog = []
  asBlog.push(blogs[2])
  test('blog with the highest likes is shown', async () => {
    const result = await listHelper.favoriteBlog(blogs)
    expect(result).toEqual(asBlog)
  })
})

describe('most blogs', () => {
  test('author with most blogs', async () => {
    const result = await listHelper.mostBlogs(blogs)
    expect(result[0].author).toBe('Robert C. Martin')
    expect(result[0].blogs).toBe(3)
  })
})

describe('most likes', () => {
  test('author with most likes', async () => {
    const result = await listHelper.mostLikes(blogs)
    expect(result[0].author).toBe('Edsger W. Dijkstra')
    expect(result[0].likes).toBe(17)
  })
})

afterAll(() => {
  mongoose.connection.close()
})