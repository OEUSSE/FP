import React, { Component } from 'react'
import './App.css';

import SimonButtonsNotes from './SimonButtonsNotes'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      turnOn: false,
      countOutput: '- -',
      strict: false,
      round: {
        num: 0,
        path: []
      }
    }

    this.onTurnOn = this.onTurnOn.bind(this)
    this.onStartGameHandler = this.onStartGameHandler.bind(this)
    this.onStrictModeHandler = this.onStrictModeHandler.bind(this)
    this.getNote = this.getNote.bind(this)
  }

  delay(timer) { return new Promise(resolve => setTimeout(resolve, timer * 1000)) }

  getRandomNote() { return Math.floor((Math.random() * (4 - 0)) + 0); }

  createRound() {
    const keyButton = {
      0: 'green',
      1: 'red',
      2: 'yellow',
      3: 'blue'
    }

    const currentStep = this.state.round.num

    this.setState((prevState, currentState) => {
      return {
        ...prevState,
        round: {
          num: currentStep === 1 ? 1 : currentStep + 1,
          path: currentStep === 1 ? [this.getRandomNote()] : [].concat([...this.state.round.path], this.getRandomNote())
        }
      }
    })

    const steps = this.state.round.path
    steps.map(step => {
      const element = document.querySelector(`.${keyButton[step]}`)
      element.classList.add('active')
      this.delay(1).then(_ => element.classList.remove('active'))
      console.log('aloha')
    })
  }

  onStartGameHandler() {
    if (this.state.turnOn) {
      document.querySelector('.count-output').classList.add('blink')
      this.setState({ countOutput: '- -' })
      this.delay(1.3).then(_ => {
        this.setState({
          countOutput: 1,
          round: { num: 1 }
        })
        document.querySelector('.count-output').classList.remove('blink')
        this.createRound()
      })
    }
  }

  onStrictModeHandler() {
    if (this.state.turnOn) {
      document.querySelector('.opts-set-a').classList.toggle('strict-mode')
      this.setState({ strict: !this.state.strict })
    }
  }

  onTurnOn() {
    this.setState({
      turnOn: !this.state.turnOn,
      countOutput: '- -',
      strict: false,
      round: {
        num: 1,
        path: []
      }
    })
  }

  getNote(note) {
    if (this.state.turnOn) {
      console.log(note)
    }
  }

  componentDidUpdate() {
    if (this.state.turnOn) {
      document.querySelector('.simon-game-app').classList.add('on')
    } else {
      document.querySelector('.count-output').classList.remove('blink')
      document.querySelector('.opts-set-a').classList.remove('strict-mode')
      document.querySelector('.simon-game-app').classList.remove('on')
    }
  }

  render() {
    return (
      <div className="simon-game-app">
        <div className="controls">
          <h1>Simon</h1>
          <div className="opts-set-a">
            <div className="count-output">{ this.state.countOutput }</div>
            <button className="btn-start btn" onClick={ this.onStartGameHandler }></button>
            <button className="btn-strict btn" onClick={ this.onStrictModeHandler }></button>
          </div>
          <div className="labels">
            <span>count</span>
            <span>start</span>
            <span>strict</span>
          </div>
          <div className="opts-power">
            <input id="power" type="checkbox" onChange={ this.onTurnOn } />
          </div>
        </div>
        <SimonButtonsNotes onTouch={ this.getNote }/>
      </div>
    );
  }
}

export default App;
