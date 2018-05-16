import React, { Component } from 'react';
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
        num: null,
        path: []
      }
    }

    this.onTurnOn = this.onTurnOn.bind(this)
    this.onStartGameHandler = this.onStartGameHandler.bind(this)
    this.onStrictModeHandler = this.onStrictModeHandler.bind(this)
    this.getNote = this.getNote.bind(this)
  }

  onStartGameHandler() {
    if (this.state.turnOn) {

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
      turnOn: !this.state.turnOn
    })
  }

  getNote(note) {
    if (this.state.turnOn) {
      console.log(note)
    }
  }

  componentDidUpdate() {
    if (this.state.turnOn) {
      document.querySelector('.count-output').classList.add('on')
    } else {
      document.querySelector('.count-output').classList.remove('on')
      document.querySelector('.count-output').classList.remove('start')
      document.querySelector('.opts-set-a').classList.remove('strict-mode')
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
