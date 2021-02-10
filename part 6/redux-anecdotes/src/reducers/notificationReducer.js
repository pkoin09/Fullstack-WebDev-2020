const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.notification
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
        type: 'SET',
        notification
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