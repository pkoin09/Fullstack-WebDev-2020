import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
import Togglable from './components/Togglable'

function App() {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(e) {
      notifyWith('Wrong username or password', 'error')
    }
  }

  const handleLogoutClick = () => {
    window.localStorage.clear('loggedNoteappUser')
    setUser(null)
  }

  const blogFormCall = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisible()
      const blogObject = {
        title: title,
        url: url,
        author: author,
      }
      blogService.setToken(user.token)
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notifyWith(`${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      notifyWith('New blog creation failed', 'error')
    }
  }

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      })
      const newBlogs = blogs.map((currentBlog) =>
        currentBlog.id === blog.id
          ? { ...currentBlog, likes: currentBlog.likes + 1 }
          : currentBlog
      )
      setBlogs(newBlogs)
      notifyWith(`like added to ${blog.title}`)
    } catch (error) {
      notifyWith(`like failed to ${blog.title}`, 'error')
    }
  }

  //======== DELETE ====//
  const deleteBlog = async (blog) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blog.id)
      const newBlogs = blogs.filter(blg => blg.id !== blog.id)
      // console.log('newBlogs', newBlogs)
      setBlogs(newBlogs)
      notifyWith(`${blog.title} by ${blog.author} has been deleted`)
    } catch (error) {
      notifyWith(`deleting ${blog.title} failed`, 'error')
    }
  }
  //========================//

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={ username }
        password={ password }
        handleUsername={ ({ target }) => setUsername(target.value) }
        handlePassword={ ({ target }) => setPassword(target.value) }
        handleLoginSubmit={ handleLoginSubmit }
      />
    </Togglable>
  )

  const createBlogForm = () => {
    return(
      <>
        <Togglable buttonLabel='create blog' ref={blogFormRef}>
          <h2>Create new</h2>
          <BlogForm
            blogFormCall={blogFormCall}
          />
        </Togglable>
      </>
    )
  }

  const blogsList = () => (
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog
          key={ blog.id }
          blog={ blog }
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )
  )

  return (
    <>
      <h2>blogs</h2>
      <Notification message={ message } />

      { user === null ?
        loginForm() :
        <div>
          <p>{ user.name } is logged in</p>
          <button id='logOut' onClick={ handleLogoutClick }>logout</button>
          { createBlogForm() }
          { blogsList() }
        </div>
      }

      <Footer />
    </>
  )
}

export default App
