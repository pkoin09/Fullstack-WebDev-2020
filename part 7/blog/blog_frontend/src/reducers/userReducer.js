import blogService from '../services/blogs'
import loginService from '../services/login'
import { notifyError, notifySuccess } from './notificationReducer'

/* eslint-disable indent */
const userReducer = (state = '', action) => {
  // console.log('usr action.data', action.data)
  switch(action.type) {
    case 'SET_USER':
      return action.data
    case 'SET_LOGOUT':
      return action.data
    default:
      return state
  }
}

export const userLogin = ({ username, password }) => {
  console.log('credentials', username, password)
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      await blogService.setToken(user.token)
      await dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(notifySuccess(`Welcome ${user.name}`, 3))
    } catch(err) {
      console.log('usrLogin err', err)
      dispatch(notifyError('Wrong username and/or password', 3))
    }
  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.clear('loggedBlogAppUser')
    await dispatch({
      type: 'SET_LOGOUT',
      data: null
    })
  }
}

export default userReducer