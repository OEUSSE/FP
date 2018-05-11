import React from 'react'

const Timer = (props) => {
  const [ min, sec ] = props.time.map(item => item = item < 10 ? '0' + item : item)
  return (
    <div>
      <section className="timer-container">
        <h1 className="timer">{ `${min}:${sec}` }</h1>
      </section>
    </div>
  )
}

export default Timer