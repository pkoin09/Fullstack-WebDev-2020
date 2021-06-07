const notificationReducer = (state = '', action) => {
  switch(action.type) {
  case 'SET':
    return action.data
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const notifySuccess = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: {
        message: message,
        type: 'success'
      }
    })
    const notifyTime = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: null
      })
    }, time * 1000)
    return notifyTime
  }
}

export const notifyError = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: {
        message: message,
        type: 'error'
      }
    })
    const notifyTime = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        notification: null
      })
    }, time * 1000)
    return notifyTime
  }
}

export default notificationReducer