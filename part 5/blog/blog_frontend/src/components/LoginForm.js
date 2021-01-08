import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleLoginSubmit,
  handleUsername,
  handlePassword
}) => {
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          username:
          <input
            id='username'
            type='text'
            name='username'
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          password:
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm