import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import './AnecdoteList.css'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`You voted for "${content}"`, 5))
  }

  return(
    <>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes((filter).toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div className='anecDiv' key={anecdote.id}>
            <div className='anecList'>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button className='anecBtn' onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
      )}
    </>
  )
}

export default AnecdoteList