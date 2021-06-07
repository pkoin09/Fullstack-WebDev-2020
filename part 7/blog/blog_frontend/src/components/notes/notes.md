```js
import React, { useState } from 'react'
import useField from '../hooks/index'

const BlogForm = ({ createBlog }) => {
  // const [ title, setTitle ] = useState('')
  // const [ author, setAuthor ] = useState('')
  // const [ url, setUrl ] = useState('')

  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const handleCreateBlog = (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    // setTitle('')
    // setAuthor('')
    // setUrl('')
  }

  return(
    <form className='form' onSubmit={ handleCreateBlog }>
      <div>
        title:
        <input
          id='title'
          type='text'
          name='Title'
          value={ title }
          onChange={ ({ target }) => setTitle(target.value) }
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type='text'
          name='Author'
          value={ author }
          onChange={ ({ target }) => setAuthor(target.value) }
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type='url'
          value={ url }
          onChange={ ({ target }) => setUrl(target.value) }
        />
      </div>
      <button type='submit'>Submit Blog</button>
    </form>
  )
}

export default BlogForm

//======================================
APP.JS
//======================================

import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
// import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notifyError, notifySuccess } from './reducers/notificationReducer'
import { initializeBlog } from './reducers/blogReducer'
import './App.css'
import { userLogout, setUser } from './reducers/userReducer'

function App() {
  const [ blgs, setBlgs ] = useState([])
  // const [ username, setUsername ] = useState('')
  // const [ password, setPassword ] = useState('')
  // const [ user, setUser ] = useState(null)
  // const [ message, setMessage ] = useState(null)

  const blogs = useSelector(state => state.blogReducer)
  const user = useSelector(state => state.userReducer)

  console.log('user in App', user)
  console.log('blgs in App', blgs)
  console.log('blogs', blogs)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlog(blogs))
    dispatch(setUser())
  }, [])

  useEffect(() => {
    // const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   setUser(user)
    //   blogService.setToken(user.token)
    // }
  }, [])

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault()
  //   try{
  //     const user = await loginService.login({
  //       username, password
  //     })
  //     window.localStorage.setItem(
  //       'loggedBlogappUser', JSON.stringify(user)
  //     )
  //     blogService.setToken(user.token)
  //     setUser(user)
  //     setUsername('')
  //     setPassword('')
  //     dispatch(notifySuccess(`welcome ${user.name}`, 3))
  //   }catch(e) {
  //     dispatch(notifyError('Wrong username or password', 3))
  //   }
  // }

  const handleLogoutClick = () => {
    // window.localStorage.clear('loggedBlogappUser')
    dispatch(userLogout())
  }

  const createBlog = async (blog) => {
    console.log('blog', blog)
    try {
      // blogFormRef.current.toggleVisible()
      blogService.setToken(user.token)
      // dispatch(blogCreate(blog))
      // const newBlog = await blogService.create(blog)
      // setBlogs(blogs.concat(newBlog))
      // dispatch(notifySuccess(`${blog.title} by ${blog.author} added`, 3))
    } catch (err) {
      console.log(err)
      // dispatch(notifyError('New blog creation failed', 3))
    }
  }

  const handleLike = async (id) => {
    try {
      const blogToLike = blogs.find(blg => blg.id === id)
      const blog = {
        ...blogToLike, likes: blogToLike.likes + Number(1)
      }
      await blogService.update(blog)
      setBlgs(blogs.map(blg => blg.id === id
        ? { ...blogToLike, likes: blogToLike.likes + Number(1) }
        : blg
      ))
      dispatch(notifySuccess(`like added to ${blog.title}`, 1.5))
    } catch(e) {
      console.log(e)
      dispatch(notifyError('liking the blog failed', 1.5))
    }
  }

  //======== DELETE ====//
  const deleteBlog = async (blog) => {
    const id = blog.id
    try {
      blogService.setToken(user.token)
      await blogService.remove(id)
      const newBlogs = blogs.filter(blg => blg.id !== id)
      setBlgs(newBlogs)
      dispatch(notifySuccess(`${blog.title} by ${blog.author} has been deleted`, 3))
    } catch (error) {
      dispatch(notifyError(`deleting ${blog.title} failed`, 3))
    }
  }
  //========================//

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm />
    </Togglable>
  )

  const createBlogForm = () => {
    return(
      <>
        <Togglable buttonLabel='create blog' ref={blogFormRef}>
          <h2>Create new</h2>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>
      </>
    )
  }

  const blogsList = () => {
    if(!blogs) {
      return null
    }
    return blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog
          key={ blog.id }
          blog={ blog }
          handleLike={handleLike}
          deleteBlog={deleteBlog}
          user={user}
        />
      )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />

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


// Blog component

import React, { useState } from 'react'
import { blogUpdateLike } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import blogDiscard from '../reducers/blogReducer'
import { notifyError, notifySuccess } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import '../App.css'

// import BlogForm from './BlogForm'

const Blog = ({ blog, user }) => {
  const [ visible, setVisible ] = useState(false)

  const dispatch = useDispatch()

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const addLike = (blog) => {
    try {
      dispatch(blogUpdateLike(blog))
      dispatch(notifySuccess(`liked ${blog.title} by ${blog.author}`, 2))
    } catch(err) {
      dispatch(notifyError('error liking blog', 2))
    }
  }

  // const DeleteBlog = ({ blog, handleDelete }) => {

  //   if (user === null || blog.user === null) {
  //     return null
  //   }

  //   if (blog.user.name !== user.name) {
  //     return null
  //   }

  //   return (
  //     <div>
  //       <button id='delBtn' className='delButton' onClick={() => handleDelete(blog)}>delete</button>
  //     </div>
  //   )
  // }

  // const handleDelete = (id) => {
  //   return dispatch(blogDiscard(id))
  // }

  const handleDelete = (blog) => {
    console.log('blog', blog)
    if(!blog.user) {
      return null
    }
    blogService.setToken(user.token)
    // const newBlogs = blogs.filter(blg => blg.id !== id)
    dispatch(blogDiscard(blog.id))
  }

  if(visible === false) {
    return(
      <div id='blgDiv' className='blogBorder'>
        <p className='title'>{blog.title} by {blog.author}</p>
        <button id='viewButton' className='viewTest' onClick={ toggleVisible }>view</button>
      </div>
    )
  } else {
    return(
      <div id='moreDiv' className='blogBorder'>
        <p>{blog.title} by {blog.author}</p>
        <button onClick={ toggleVisible }>hide</button><br />
        <p className='likes'>likes: {blog.likes} {' '}
          <button id='addLike' onClick={() => addLike(blog)}>like</button>
        </p>
        <p className='url'>Url: {blog.url}</p>
        {
          (blog.user.name !== user.name)
            ? null
            : <button id='delBtn' className='delButton' onClick={() => handleDelete(blog)}>Delete</button>
        }
        {/* <DeleteBlog
          user={user}
          blog={blog}
          handleDelete={deleteBlog}
        /> */}
      </div>
    )
  }
}

export default Blog
//==================================
// Blog
//==================================
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { blogDiscard, blogUpdateLike } from '../reducers/blogReducer'
import { notifyError, notifySuccess } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  // const [ visible, setVisible ] = useState(false)

  const dispatch = useDispatch()

  // const toggleVisible = () => {
  //   setVisible(!visible)
  // }

  const addLike = (blog) => {
    try {
      dispatch(blogUpdateLike(blog))
      dispatch(notifySuccess(`liked ${blog.title} by ${blog.author}`, 2))
    } catch(err) {
      dispatch(notifyError('error liking blog', 2))
    }
  }

  const handleDelete = () => {
    if(window.confirm(`discard ${blog.title} by ${blog.author}?`)) {
      try {
        blogService.setToken(user.token)
        dispatch(blogDiscard(blog.id))
        dispatch(notifySuccess(`deleted ${blog.title}`, 2))
      }catch(err) {
        dispatch(notifyError('blog not deleted!'))
      }
    }
  }

  // if(visible === false) {
  //   return(
  //     <div id='blgDiv' className='blogBorder'>
  //       <p className='title'>{blog.title} by {blog.author}</p>
  //       <button id='viewButton' className='viewTest' onClick={ toggleVisible }>view</button>
  //     </div>
  //   )
  // } else {
    return(
      <div id='moreDiv' className='blogBorder'>
        <Link to='blogs/${blog.id}'>{blog.title}</Link> by {blog.author}
        <button onClick={ toggleVisible }>hide</button><br />
        <p className='likes'>likes: {blog.likes} {' '}
          <button id='addLike' onClick={() => addLike(blog)}>like</button>
        </p>
        <p className='url'>Url: {blog.url}</p>
        {
          (blog.user.name !== user.name)
            ? null
            : <button id='delBtn' className='delButton' onClick={() => handleDelete(blog)}>Delete</button>
        }
      </div>
    )
  }
}

export default Blogs