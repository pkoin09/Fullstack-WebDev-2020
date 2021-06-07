import React from 'react'
// import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'

import { Form, Button, Row, Col } from 'react-bootstrap'
import { notifyError } from '../reducers/notificationReducer'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if(username.field.value === '' || password.field.value === '') {
      dispatch(notifyError('username and/or password cannot be empty', 3))
    } else {
      dispatch(userLogin({
        username: username.field.value,
        password: password.field.value
      }))
      username.setEmpty()
      password.setEmpty()
    }
  }

  return(
    <div>
      <h4>Login</h4>
      <form onSubmit={handleLoginSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control {...username.field} placeholder='username' />
            </Col>
            <Col>
              <Form.Control {...password.field} placeholder='password' />
            </Col>
          </Row>
        </Form.Group>
        <Button variant='outline-primary' id='login-button' type='submit'>login</Button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleLoginSubmit: PropTypes.func.isRequired,
//   handleUsername: PropTypes.func.isRequired,
//   handlePassword: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired
// }

export default LoginForm