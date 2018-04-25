/**
 * @todo Display the location for each move in the format (col, row) in the move history list. (👍)
 * @todo Bold the currently selected item in the move list. (👍)
 * @todo Rewrite Board to use two loops to make the squares instead of hardcoding them. (👍)
 * @todo Add a toggle button that lets you sort the moves in either ascending or descending order. (👍)
 * @todo When someone wins, highlight the three squares that caused the win. (👍)
 * @todo When no one wins, display a message about the result being a draw. (👍)
 */

import React from 'react'

import Board from './Board'

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [{
        squares: Array(9).fill(null),
        pos: []
      }],
      xIsNext: true,
      stepNumber: 0,
      sortPos: 'asc'
    }

    this.handleClick = this.handleClick.bind(this)
    this.sortMatches = this.sortMatches.bind(this)
  }

  sortMatches() {
    const reverseSteps = [...this.state.history.slice(1)].reverse()
    this.setState({
      sortPos: this.state.sortPos === 'asc' ? 'desc' : 'asc',
      history: [...this.state.history.slice(0, 1)].concat(reverseSteps)
    })
    this.resetWinnerMatch()
  }

  setActiveButton(step) {
    const buttons = document.querySelectorAll('[aria-checked]')
    buttons.forEach((button, index) => {
      button.setAttribute('aria-checked', 'false')
      if (step && step === (index)) // If a step button has been clicked
        button.setAttribute('aria-checked', 'true')
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
    this.setActiveButton(step)
    this.resetWinnerMatch()
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0, x = lines.length; i < x; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], [a, b, c]]
      }
    }
    return null
  }

  highlightWinnerMatch(played) {
    const squareBtns = Array.from(document.querySelectorAll('[data-index]'))
    squareBtns.filter((square) => {
      let squareId = square.attributes['data-index'].value
      if (played.includes(parseInt(squareId))) {
        square.classList.add('win-square')
      }
    })
  }

  resetWinnerMatch() {
    const squareBtns = Array.from(document.querySelectorAll('[data-index]'))
    squareBtns.map((square) => {
      square.classList.remove('win-square')
    })
  }

  calculatePos(posIndex) {
    let posBoard = {
      0: [0, 0],
      1: [0, 1],
      2: [0, 2],
      3: [1, 0],
      4: [1, 1],
      5: [1, 2],
      6: [2, 0],
      7: [2, 1],
      8: [2, 2],
    }

    return posBoard[posIndex]
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = [...current.squares]
    const pos = [...current.pos]
    const currentPos = this.calculatePos(i)

    if (this.calculateWinner(squares) || squares[i]) return

    this.setActiveButton() // reset all aria-cheked of button to false

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    pos.push(currentPos)

    this.setState({
      history: history.concat([{ squares, pos }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares)
    const currentPos = current.pos[current.pos.length - 1]
    const [x, y] = (currentPos && currentPos.length) ? currentPos : ['-', '-']

    let stepNumbers = (this.state.sortPos === 'asc')
                      ?
                        [...new Array(history.length).keys()]
                      :
                        [...new Array(history.length + 1).keys()].reverse()

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to #${stepNumbers[move]}`  :
        'Go to game start'

      return (
        <li key={move} className={`${move ? `h-movement-${move}` : 'go-start'}`}>
          <button aria-checked="true" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      let [playerWin, played] = winner
      status = `Winner: ${playerWin}`
      this.highlightWinnerMatch(played)
    }
    else {
      if (history[0].squares.length === this.state.stepNumber) {
        status = 'Juego empatado!'
      } else {
        status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          <div className="position-info">
            <p>
              <span>Position</span>
              <span className="x-pos">X: {x}</span>
              <span className="y-pos">Y: {y}</span>
            </p>
          </div>
          <div className="sorting-btn-container">
            <span>Clasificación de jugadas de manera</span>
            <button className={`${this.state.sortPos}`} onClick={this.sortMatches}>{this.state.sortPos}</button>
          </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game
