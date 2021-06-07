import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { blogUpdateLike, blogDiscard } from '../reducers/blogsReducer'
import { notifyError, notifySuccess } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Comments from './Comments'

import { Form, Button, Row, Col } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.userReducer)
  const users = useSelector(state => state.usersReducer)
  const [isVisible, setIsVisible] = useState(false)
  console.log(isVisible)

  const currUserFromId = users.find(usr => usr.id === blog.user)
  const blogWritter = !blog.user.name ? currUserFromId.name : blog.user.name
  const currUser = user.name

  useEffect(() => {
    setIsVisible(currUser === blogWritter)
    console.log('userInfo', currUser, blogWritter)
  }, [])

  const dispatch = useDispatch()
  const history = useHistory()



  console.log('blog.user.name', blog)

  const addLike = (blog) => {
    try {
      dispatch(blogUpdateLike(blog))
      dispatch(notifySuccess(`liked ${blog.title} by ${blog.author}`, 3))
    } catch(err) {
      dispatch(notifyError('error liking blog', 3))
    }
  }

  const handleDelete = async (blog) => {
    if(window.confirm(`discard ${blog.title} by ${blog.author}?`)) {
      try {
        blogService.setToken(user.token)
        dispatch(blogDiscard(blog.id))
        dispatch(notifySuccess(`deleted ${blog.title}`, 1))
        history.push('/')
      }catch(err) {
        dispatch(notifyError('blog not deleted!', 2))
      }
    }
  }

  if(!blog) {
    return null
  }

  let comments = []
  console.log('"blog"', blog)
  console.log('"user"', user)
  if(blog.comments) {
    comments = blog.comments
  }

  return(
    <div>
      <h5>{blog.title} by {blog.author}</h5>
      <p className='url'>Url: <a href='#'>{blog.url}</a></p>
      <Form.Group>
        <Row>
          <Col sm='auto'>
            <Form.Label className='likes text-center'>likes: {blog.likes}</Form.Label>
          </Col>
          <Col sm='auto'>
            <Button variant='outline-primary' id='addLike' onClick={() => addLike(blog)}>like</Button>
          </Col>
        </Row>
      </Form.Group>
      <Form.Label>Blog added by {blog.user.name}</Form.Label>
      <Form.Group>
        <Comments id={blog.id} comments={comments} />
      </Form.Group>
      {
        isVisible && <Button variant='outline-primary' id='delBtn' onClick={() => handleDelete(blog)}>Delete blog</Button>
      }
    </div>
  )
}

export default Blog