import React, { Component, PropTypes } from 'react'
import { isUri } from 'valid-url'

import { focusOnEditor } from './Editor'

let inputDom = null

class AddLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }

    this._handleAddClick = this._handleAddClick.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
  }

  componentDidMount() {
    inputDom = this.refs.input
  }

  _handleAddClick() {
    const { url } = this.state
    if (isUri(url)) {
      this.props.onAdd({ url })
      this.setState({ url: '' })
    }
  }

  _handleInputChange(e) {
    const url = e.target.value
    this.setState({ url });
  }

  _handleKeyPress(e) {
    switch (e.which) {
      case 13:
        // enter
        return this._handleAddClick()
      case 27:
        // escape
        return focusOnEditor()
      default:
        return
    }
  }

  render() {
    const { onAdd } = this.props
    const { url } = this.state

    return (
      <span>
        <input
          ref="input"
          type="text"
          value={url}
          placeholder="Paste script url here"
          onKeyUp={this._handleKeyPress}
          onChange={this._handleInputChange} />
        <button
          disabled={!isUri(url)}
          onClick={this._handleAddClick}>
          Add
        </button>
      </span>
    )
  }
}

AddLibrary.propTypes = {
  onAdd: PropTypes.func.isRequired
}

export default AddLibrary

export function focusOnAddLibInput() {
  if (inputDom) inputDom.focus()
}
