import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//components
const Statistics = (props) => {
  const goodClck = props.clicks.good;
  const neutralClk = props.clicks.neutral;
  const badClk = props.clicks.bad;
  const allClk = goodClck + neutralClk + badClk

  return(
    <>
    <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good:</td><td>{goodClck}</td>
          </tr>
          <tr>
            <td>neutral:</td><td>{neutralClk}</td>
          </tr>
          <tr>
            <td>bad:</td><td>{badClk}</td>
          </tr>
          <tr>
            <td>All:</td><td>{allClk}</td>
          </tr>
          <tr>
            <td>Average: {(goodClck - badClk) / allClk} </td>
          </tr>
          <tr> 
            <td>Positive:</td><td>{allClk === 0 ? "No feedback given" : (goodClck / (allClk) * 100)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  const [clicks, setClicks] = useState(
    {
      good: 0, 
      neutral: 0, 
      bad: 0
    }
  );

  //Event handlers
  const handleGoodClick = () => {
    const newClick = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClick);
  }

  const handleNeutralClick = () => {
    const newClick = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(newClick);
  }

  const handleBadClick = () => {
    const newClick = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(newClick);
  }

  return (
    <>
      <h1>Give feedback</h1>

      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

    <Statistics clicks={clicks}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)