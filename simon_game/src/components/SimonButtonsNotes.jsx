import React from 'react'

const SimonButtonsNotes = props => (
  <div className="button-notes-container">
    <div className="top">
      <div className="press-button green" onClick={ props.onTouch.bind(null, 0) }></div>
      <div className="press-button red" onClick={ props.onTouch.bind(null, 1) }></div>
    </div>
    <div className="bottom">
      <div className="press-button yellow" onClick={ props.onTouch.bind(null, 2) }></div>
      <div className="press-button blue" onClick={ props.onTouch.bind(null, 3) }></div>
    </div>
  </div>
)

export default SimonButtonsNotes