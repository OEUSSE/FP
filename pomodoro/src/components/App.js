import React, { Component } from 'react'

import PomodoroCrtls from './PomodoroCtrls'
import TimerCtrls from './TimerCtrls'
import Timer from './Timer'

import './App.css';

class App extends Component {
  constructor() {
    super()

    this.sITimer = null

    this.state = {
      timer: [25, 0],
      currentOpt: 'a'
    }

    this.initTimerHandler   = this.initTimerHandler.bind(this)
    this.shortBreakHandler  = this.shortBreakHandler.bind(this)
    this.longBreakHandler   = this.longBreakHandler.bind(this)
    this.startTimerHandler  = this.startTimerHandler.bind(this)
    this.stopTimerHandler   = this.stopTimerHandler.bind(this)
    this.resetTimerHandler  = this.resetTimerHandler.bind(this)
  }

  initTimerHandler() {
    this.setState({ timer: [ 25, 0 ], currentOpt: 'a' })
    this.stopTimerHandler()
    setTimeout(() => {
      this.startTimerHandler()
    }, 500)
  }

  shortBreakHandler() {
    this.setState({ timer: [ 5, 0 ], currentOpt: 'b' })
    this.stopTimerHandler()
    setTimeout(() => {
      this.startTimerHandler()
    }, 500)
  }

  longBreakHandler() {
    this.setState({ timer: [ 10, 0 ], currentOpt: 'c' })
    this.stopTimerHandler()
    setTimeout(() => {
      this.startTimerHandler()
    }, 500)
  }

  startTimerHandler() {
    let [min, sec] = this.state.timer
    console.log([min, sec])
    this.sITimer = setInterval(() => {
      if (min > 0 || sec > 0) {
        if (sec === 0) {
          min = min - 1
          sec = 59
        } else {
          sec = sec - 1
        }
      } else {
        this.stopTimerHandler()
        return false
      }
      this.setState({ timer: [ min, sec ] })
    }, 1000)
  }

  stopTimerHandler() {
    clearInterval(this.sITimer)
  }

  resetTimerHandler() {
    this.stopTimerHandler()
    switch(this.state.currentOpt) {
      case "a": this.setState({ timer: [ 25, 0 ] }); break;
      case "b": this.setState({ timer: [ 5, 0 ] }); break;
      case "c": this.setState({ timer: [ 10, 0 ] }); break;
    }
    setTimeout(() => {
      this.startTimerHandler()
    }, 500)
  }

  render() {
    return (
      <div className="app">
        <PomodoroCrtls
          initTimer={ this.initTimerHandler }
          shortBreakTimeHandler={ this.shortBreakHandler }
          longBreakHandler={ this.longBreakHandler }
        />
        <Timer time={ this.state.timer } />
        <TimerCtrls
          onStart={ this.startTimerHandler }
          onStop={ this.stopTimerHandler }
          onRestart={ this.resetTimerHandler }
        />
      </div>
    )
  }
}

export default App;
