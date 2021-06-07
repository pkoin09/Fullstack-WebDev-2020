import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notificationReducer)

  if(!message) {
    return null
  } else {
    return(
      <div className={message.type}>
        { message.message }
      </div>
    )
  }
}

export default Notification