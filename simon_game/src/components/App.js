import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="simon-game-app">
        <div className="controls">
          <h1>Simon</h1>
          <div className="opts-set-a">
            <div className="count-output">- -</div>
            <button className="btn-start btn"></button>
            <button className="btn-strict btn"></button>
          </div>
          <div className="labels">
            <span>count</span>
            <span>start</span>
            <span>strict</span>
          </div>
          <div className="opts-power">
            <input id="power" type="checkbox" />
          </div>
        </div>
        <div className="top">
          <div className="press-button green"></div>
          <div className="press-button red"></div>
        </div>
        <div className="bottom">
          <div className="press-button yellow"></div>
          <div className="press-button blue"></div>
        </div>
      </div>
    );
  }
}

export default App;
