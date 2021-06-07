import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import { initializeBlog } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'

import './App.css'

function App() {

  const blogs = useSelector(state => state.blogsReducer)
  const user = useSelector(state => state.userReducer)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  //==
  // if (matchUserId) / else if (!blogs) / ..
  //==
  const matchUserId = useRouteMatch('/users/:id')
  const userBlogs = matchUserId
    ? !blogs
      ? null
      : blogs.filter(blg => blg.user.id === matchUserId.params.id)
    : null

  //==
  // if (matchBlogId) / else if (!blogs) / ..
  //==
  const matchBlogId = useRouteMatch('/blogs/:id')
  const currentBlog = matchBlogId
    ? !blogs
      ? null
      : blogs.find(blg => {
        return blg.id === matchBlogId.params.id })
    : null

  return (
    <div className='container'>
      <Navigation user={user}/>
      <h2>Blogs</h2>
      <Notification />

      <Switch>

        <Route path='/users/:id'>
          <User blogs={userBlogs}/>
        </Route>

        <Route path='/users'>
          {user ? <Users /> : <Redirect to='/login' />}
        </Route>

        <Route path='/blogs/:id'>
          <Blog blog={currentBlog}/>
        </Route>

        <Route path='/login'>
          { user ? <Redirect to='/' /> : <LoginForm /> }
        </Route>

        <Route exact path='/'>
          {
            !user
              ?
              <Redirect to='/login' />
              : (
                <div>
                  <Togglable buttonLabel='create blog' ref={blogFormRef}>
                    <h4>Create new</h4>
                    <BlogForm />
                  </Togglable>
                  <Blogs />
                </div>)
          }
        </Route>

      </Switch>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App