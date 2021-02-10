import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = {
        ...anecToChange, 
        votes: anecToChange.votes + Number(1)
      }
      return state.map(anecVote => anecVote.id !== id ? anecVote : changedAnec)
    default:
      return state
  }
}

  export const initializeAnecdotes = (data) => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({
          type: 'INIT_ANECDOTES',
          data: anecdotes
      })
    }
  }

  export const createAnecdote = (data) => {
    return async dispatch => {
      const anecdotes = await anecdoteService.createNew(data)
      dispatch({
          type: 'CREATE_ANECDOTE',
          data: anecdotes
      })
    }
  }

  export const voteFor = (id) => {
    return async dispatch => {
      const oldVote = await anecdoteService.getById(id)
      const newVote = {
        ...oldVote,
        votes: oldVote.votes + 1
      }

      const anecdote = await anecdoteService.update(newVote)
      dispatch({
          type: 'VOTE',
          data: anecdote
      })
    }
  }
  
  export default reducer