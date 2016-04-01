import React, { Component, PropTypes } from 'react'
import Toggle from 'react-toggle'
require('react-toggle/style.css')

const VimToggle = ({ on, onToggle }) => {
  const text = on ? 'Vim On' : 'Vim Off'

  return (
    <label>
      <Toggle
        defaultChecked={on}
        onChange={onToggle} />
      <span style={{verticalAlign: 'middle'}}>{text}</span>
    </label>
  )
}

VimToggle.propTypes = {
  on: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default VimToggle
