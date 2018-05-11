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

  async initTimerHandler() {
    await this.setState({ timer: [ 25, 0 ], currentOpt: 'a' })
    this.stopTimerHandler()
    this.startTimerHandler()
  }

  async shortBreakHandler() {
    await this.setState({ timer: [ 5, 0 ], currentOpt: 'b' })
    this.stopTimerHandler()
    this.startTimerHandler()
  }

  async longBreakHandler() {
    await this.setState({ timer: [ 10, 0 ], currentOpt: 'c' })
    this.stopTimerHandler()
    this.startTimerHandler()
  }

  startTimerHandler() {
    let [min, sec] = this.state.timer
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

  async resetTimerHandler() {
    this.stopTimerHandler()
    switch(this.state.currentOpt) {
      case "a": await this.setState({ timer: [ 25, 0 ] }); break;
      case "b": await this.setState({ timer: [ 5, 0 ] }); break;
      case "c": await this.setState({ timer: [ 10, 0 ] }); break;
    }
    this.startTimerHandler()
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
