import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//components
const Statistic = (props) => {
  console.log(props);
  return(
    <>
      <td>{props.text}</td><td>{props.value}</td>
    </>
  );
}

const Statistics = (props) => {
  const goodClk = props.good;
  const neutralClk = props.neutral;
  const badClk = props.bad;
  const allClk = goodClk + neutralClk + badClk

  return(
    <>
    <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
              <Statistic text="good" value={goodClk}/>
          </tr>
          <tr>
              <Statistic text="neutral" value={neutralClk}/>
          </tr>
          <tr>
              <Statistic text="bad" value={badClk}/>
          </tr>
          <tr>
              <Statistic text="all" value={allClk}/>
          </tr>
          <tr>
              <Statistic text="average" value={allClk === 0 ? "No feedback given" : ((goodClk - badClk) / allClk)}/>
          </tr>
          <tr>
              <Statistic text="positive" value={allClk === 0 ? "No feedback given" : (goodClk / (allClk) * 100)}/>
          </tr>
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)