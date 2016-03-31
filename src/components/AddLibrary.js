import React, { Component, PropTypes } from 'react'
import { isUri } from 'valid-url'

export default class AddLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }

    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleAddClick = this._handleAddClick.bind(this)
  }

  _handleInputChange(e) {
    const url = e.target.value
    this.setState({ url });
  }

  _handleAddClick() {
    const { url } = this.state
    if (isUri(url)) {
      this.props.onAdd(url)
      this.setState({ url: '' })
    }
  }

  render() {
    const { onAdd } = this.props
    const { url } = this.state

    return (
      <div>
        <span>Paste script cdn url here: </span>
        <input
          type="text"
          value={url}
          onChange={this._handleInputChange} />
        <button
          disabled={!isUri(url)}
          onClick={this._handleAddClick}>
          Add
        </button>
      </div>
    )
  }
}

AddLibrary.propTypes = {
  onAdd: PropTypes.func.isRequired
}
