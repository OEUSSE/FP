import React from 'react'

const Square = (props) => (
  <button className="square" data-index={props.id} onClick={props.onClick}>
    {props.value}
  </button>
)

export default Square