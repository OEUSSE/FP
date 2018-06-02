/**
 * TODO: Mostrar correctamente la secuencia de las notas. (👍)
 * TODO: Corregir bug -> Al presionar varias veces y al mismo tiempo el botón start, crea nuevas notas.
 * TODO: Validar la selección de notas: ERRORES y el mínimo tiempo para seleccionar.
 * TODO: Bloquear las notas cuando el path se esté creando. (👍)
 * TODO: Strict mode
 */

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
        start: false,
        num: 0,
        path: []
      }
    }

    this.onCreateRound = false
    this.currentIndexNote = 0
    this.hits = 0
    this.count = 0

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

    this.onCreateRound = true

    let currentStep = this.state.round.num

    new Promise((resolve, reject) => {
      resolve(this.setState((prevState, currentState) => {
        return {
          ...prevState,
          countOutput: currentStep + 1,
          round: {
            start: true,
            num: currentStep + 1,
            path: [].concat([...this.state.round.path], this.getRandomNote())
          }
        }
      }))
    }).then(_ => {
      const steps = this.state.round.path
      this.setClassActive(steps, this.count)
        .then(_ => this.onCreateRound = false)
    })
  }

  async setClassActive(steps, c) {
    const keyButton = {
      0: 'green',
      1: 'red',
      2: 'yellow',
      3: 'blue'
    }

    if (this.count + 1 <= steps.length) {
      const element = document.querySelector(`.${keyButton[steps[c]]}`)
      await this.delay(1)
      this.setState({ countOutput: this.state.round.num })
      element.classList.add('active')
      await this.delay(1)
      element.classList.remove('active')
      this.count++
      return this.setClassActive(steps, this.count)
    }
    return new Promise(resolve => resolve(this.count = 0))
  }

  initGame() {
    this.setState({
      countOutput: 1,
      round: {
        num: 0,
        path: []
      }
    })
    this.createRound()
  }

  onStartGameHandler() {
    if (this.state.turnOn) {
      document.querySelector('.count-output').classList.add('blink')
      this.setState({ countOutput: '- -' })
      this.delay(1.3).then(_ => {
        this.initGame()
        document.querySelector('.count-output').classList.remove('blink')
      })
    }
  }

  onStrictModeHandler() {
    if (this.state.turnOn) {
      document.querySelector('.opts-set-a').classList.toggle('strict-mode')
      this.setState({ strict: !this.state.strict })
    }
  }

  async getNote(note) {
    // 👍 - 👎 - 💤 - 📣 - 🔔
    const path = this.state.round.path
    if (this.state.turnOn && this.state.round.start && !this.onCreateRound) {
      if (note === path[this.currentIndexNote]) {
        this.hits = this.hits + 1
        this.currentIndexNote = this.currentIndexNote + 1
        console.log('👍')
        if (path.length === this.hits) {
          console.log('✨')
          this.setState({ countOutput: '👍' })
          await this.delay(1)
          this.createRound()
          this.hits = 0
          this.currentIndexNote = 0
        }
      } else {
        this.hits = 0
        this.currentIndexNote = 0
        this.setState({ countOutput: '👎' })
        console.log('👎')
        this.setClassActive(path, this.count)
      }
    }
  }

  onTurnOn() {
    this.setState({
      turnOn: !this.state.turnOn,
      countOutput: '- -',
      strict: false,
      round: {
        num: 0,
        path: []
      }
    })
    this.hits = 0
    this.currentIndexNote = 0
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
