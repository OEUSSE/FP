import React from 'react'

const PomodoroCtrls = props => (
  <div>
    <header className="pomodoro-controls">
      <button className="p-control btn" onClick={ props.initTimer }>Pomodoro</button>
      <button className="p-control btn" onClick={ props.shortBreakTimeHandler }>Short Break</button>
      <button className="p-control btn" onClick={ props.longBreakHandler }>Long Break</button>
    </header>
  </div>
)

export default PomodoroCtrls