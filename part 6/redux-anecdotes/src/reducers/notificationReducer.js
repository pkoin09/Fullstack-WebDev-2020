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

let NotifyId

export const setNotification = (notification, time) => {
  return async dispatch => {
    if (NotifyId !== undefined) {
      clearTimeout(NotifyId)
    }
    dispatch({
        type: 'SET',
        notification
    })
    NotifyId = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        notification: null
      })
    }, time * 1000)
  }
}

export default notificationReducer