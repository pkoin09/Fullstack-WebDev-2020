import React from 'react'

const message = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.message}
    </div>
  )
}

export default message