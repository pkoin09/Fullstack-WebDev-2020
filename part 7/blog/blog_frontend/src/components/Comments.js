import React from 'react'
import { useDispatch } from 'react-redux'

import { notifyError, notifySuccess } from '../reducers/notificationReducer'
import { useField } from '../hooks/index'

import { Row, Col, Form, Button } from 'react-bootstrap'
import { blogComment } from '../reducers/blogsReducer'

const Comments = (props) => {
  const comments = useField('text')
  const dispatch = useDispatch()

  //does not re-render!
  const SubmitComment = (e) => {
    console.log('comments', comments)
    e.preventDefault()
    if(comments.field.value === '') {
      dispatch(notifyError('Cant submit an empty comment', 3))
    } else {
      try {
        dispatch(blogComment(props.id, comments.field.value))
        dispatch(notifySuccess('comment was submited', 3))
        comments.setEmpty()
      } catch(err) {
        dispatch(notifyError('Error submitting comment', 3))
        console.log('"err on submit comments"', err)
      }
    }
  }

  return (
    <>
      <h5>Comments</h5>
      <ul>
        {
          props.comments.map((cmnt, index) =>
            <li key={index}>{cmnt}</li>
          )
        }
      </ul>
      <div>
        <Form onSubmit={SubmitComment}>
          <Row>
            <Col sm='6'>
              <Form.Control
                as='textarea'
                rows={3}
                type='text'
                placeholder='comment'
                {...comments.field}
              />
            </Col>
            <Col sm='2'>
              <Button variant='outline-primary' type='submit'>Submit</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default Comments