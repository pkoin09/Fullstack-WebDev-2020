const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce((a, b) => {
    return a + b.likes
  }, 0)

  return sum
}

const favoriteBlog = (blogs) => {
  let sortedLikes = blogs.map(blg => blg.likes).sort((a, b) => b - a)

  return blogs.filter(blog => {
    if(blog.likes === sortedLikes[0]) {
      return blog
    }
  })
}

const mostBlogs = (blogs) => {
  const mlbog = _(blogs)
    .groupBy('author')
    .map((obj, key) => {
      return {
        'author': key,
        'blogs': _.size(obj, 'blogs')
      }
    })
    .orderBy('blogs', 'desc')
    .value()

  return mlbog
}

const mostLikes = (blogs) => {
  const mlbog = _(blogs)
    .groupBy('author')
    .map((obj, key) => {
      return {
        'author': key,
        'likes': _.sumBy(obj, 'likes')
      }
    })
    .orderBy('likes', 'desc')
    .value()

  return mlbog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}