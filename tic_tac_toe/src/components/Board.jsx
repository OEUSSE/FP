import React from 'react'

import Square from './Square'

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        id={i}
        key={i}
      />
    )
  }

  makeSquares() {
    let squares = [], rowSquares = [], innerSquare = []

    for (let i = 0, x = 8; i <= x; i++) {
      innerSquare.push(this.renderSquare(i))
      if (innerSquare.length === 3) {
        rowSquares.push(innerSquare)
        innerSquare = []
      }
    }

    for (let i = 0, x = 3; i < x; i++) {
      squares.push(<div className="board-row" key={i}>{rowSquares[i]}</div>)
    }

    return squares
  }

  render() {
    return (
      <div>{this.makeSquares()}</div>
    )
  }
}

export default Board
