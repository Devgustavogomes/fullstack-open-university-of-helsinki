import { useState } from 'react'


const Text = ({ content }) => {
  return (
    <div>
      <p>{content}</p>
    </div>
  )
}

const Button = ({ name, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>
        {name}
      </button>
    </>
  )
}

const StatisticsLine = ({ content }) => {
  return (
    <div>
      <p>{content}</p>
    </div>
  )
}

const Statistics = ({ statistics }) => {
  return (
    <>
      <Text content='Statistics' />
      {statistics.total > 0 ?
        (<div>
          <StatisticsLine content={`good: ${statistics.good}`} />
          <StatisticsLine content={`neutral: ${statistics.neutral}`} />
          <StatisticsLine content={`bad: ${statistics.bad}`} />
          <StatisticsLine content={`all: ${statistics.total}`} />
          <StatisticsLine content={`average: ${statistics.points / statistics.total}`} />
          <StatisticsLine content={`positive: ${(statistics.good / statistics.total) * 100}%`} />
        </div>) : ('No feedback given')}
    </>

  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [points, setPoints] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setPoints(points + 1)
    setTotal(total + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
    setPoints(points - 1)
    setTotal(total + 1)
  }


  return (
    <div>
      <Text content='Give Feedback' />
      <Button name='good' handleClick={handleClickGood} />
      <Button name='neutral' handleClick={handleClickNeutral} />
      <Button name='bad' handleClick={handleClickBad} />
      <Statistics statistics={{ good: good, neutral: neutral, bad: bad, total: total, points: points }} />
    </div>
  )
}

export default App
