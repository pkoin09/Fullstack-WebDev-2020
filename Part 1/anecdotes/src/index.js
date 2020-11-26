import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  //state
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(6).fill(0));

  console.log(vote)

  //event handlers
 const handleClick = () => {
   setSelected(() => setSelected(Math.floor(Math.random() * anecdotes.length)));
  }

  const handleVote = () => {
      const voteCpy = [...vote]
      voteCpy[selected] += 1
      setVote(voteCpy)
  }

  const popVote = vote.indexOf(Math.max(...vote));

  const allVotes = vote.reduce((a, b) => a + b, 0);

  return (
    <>
      <h1>Anecdote of the day</h1>

      {props.anecdotes[selected]}<br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>Next anecdote</button>

      <h3>Anecdote with most votes</h3>
      <p>{allVotes === 0 ? "No votes cat yet" : anecdotes[popVote]}</p>
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)