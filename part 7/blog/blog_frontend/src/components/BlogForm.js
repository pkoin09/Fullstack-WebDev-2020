// import React from 'react'
import React from 'react'
import { useField } from '../hooks/index'
import { useDispatch, useSelector } from 'react-redux'
import { blogCreate } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { notifyError, notifySuccess } from '../reducers/notificationReducer'

import { Button, Form, Col, Row } from 'react-bootstrap'

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  // const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer)

  const handleCreateBlog = (e) => {
    e.preventDefault()

    if(title.field.value === '' || author.field.value === '' || url.field.value === '') {
      dispatch(notifyError('Please fill out all form inputs', 3))
    } else {
      try {
        const blogObject = {
          title: title.field.value,
          author: author.field.value,
          url: url.field.value,
        }
        blogService.setToken(user.token)
        dispatch(blogCreate(blogObject))
        title.setEmpty()
        author.setEmpty()
        url.setEmpty()
        dispatch(notifySuccess(`${blogObject.title} by ${blogObject.author} added`, 3))
        // blogFormRef.current.toggleVisible()
      } catch(err) {
        console.log(err)
        dispatch(notifyError('New blog creation failed', 3))
      }
    }
  }

  return(
    <Form className='form' onSubmit={ handleCreateBlog }>
      <Form.Group as={Row}>
        <Form.Label column="lg" sm={1}>title:</Form.Label>
        <Col sm='6'>
          <Form.Control {...title.field} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column="lg" lg={1}>author:</Form.Label>
        <Col sm='6'>
          <Form.Control {...author.field} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column="lg" lg={1}>url:</Form.Label>
        <Col sm='6'>
          <Form.Control {...url.field} />
        </Col>
        <Col sm='5'>
          <Button variant='outline-primary' type='submit'>Submit Blog</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default BlogForm