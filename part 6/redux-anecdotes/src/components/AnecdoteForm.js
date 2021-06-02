import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import './AnecdoteForm.css'

const AnecdoteForm = (props) => {

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`created "${content}" anecdote`, 2)
    setTimeout(() => {
      props.setNotification('')
    }, 3000)
  }

  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button className='anecForm' type='submit'>create</button>
      </form>
    </>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)