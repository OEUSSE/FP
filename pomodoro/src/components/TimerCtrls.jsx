import React from 'react'

const TimerCtrls = props => (
  <div>
    <footer className="timer-controls">
      <button className="t-control btn" onClick={ props.onStart }>Start</button>
      <button className="t-control btn" onClick={ props.onStop }>Stop</button>
      <button className="t-control btn" onClick={ props.onRestart }>Reset</button>
    </footer>
  </div>
)

export default TimerCtrls