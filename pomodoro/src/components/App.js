import React, { Component } from 'react'

import PomodoroCrtls from './PomodoroCtrls'
import TimerCtrls from './TimerCtrls'
import Timer from './Timer'

import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      timer: null
    }

    this.initTimerHandler = this.initTimerHandler.bind(this)
    this.shortBreakHandler = this.shortBreakHandler.bind(this)
    this.LongBreakHandler = this.LongBreakHandler.bind(this)
    this.startTimerHandler = this.startTimerHandler.bind(this)
    this.stopTimerHandler = this.stopTimerHandler.bind(this)
    this.resetTimerHandler = this.resetTimerHandler.bind(this)
  }

  initTimerHandler() {

  }

  shortBreakHandler() {

  }

  LongBreakHandler() {

  }

  startTimerHandler() {

  }

  stopTimerHandler() {

  }

  resetTimerHandler() {

  }

  render() {
    return (
      <div className="app">
        <PomodoroCrtls />
        <Timer />
        <TimerCtrls />
      </div>
    )
  }
}

export default App;
