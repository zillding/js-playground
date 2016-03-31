import React, { Component, PropTypes } from 'react'

export default class AddLibrary extends Component {
  constructor(props) {
    super(props)

    this._onAddClick = this._onAddClick.bind(this)
  }

  _onAddClick() {
    const text = this.refs.input.value
    if (text) this.props.onAdd(text)
  }

  render() {
    return (
      <div>
        <input ref="input" type="text"/>
        <button onClick={this._onAddClick}>Add</button>
      </div>
    )
  }
}

AddLibrary.propTypes = {
  onAdd: PropTypes.func.isRequired
}
