import React, { Component, PropTypes } from 'react'
import { isUri } from 'valid-url'

const containerStyle = {
  padding: 10,
  textAlign: 'center'
}

class AddDefaultLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      url: ''
    }

    this._handleAdd = this._handleAdd.bind(this)
  }

  componentDidMount() {
    this.refs.name.focus()
  }

  _handleInputChange(key, e) {
    const text = e.target.value
    const o = {}
    o[key] = text
    this.setState(o);
  }

  _handleAdd() {
    let { name, url } = this.state
    name = name.trim()
    url = url.trim()

    if (name && isUri(url)) {
      this.props.onAdd({ name, url })
      this.setState({
        name: '',
        url: ''
      })
    }
  }

  render() {
    const { name, url } = this.state

    return (
      <div style={containerStyle}>
        <div style={{marginBottom: 5}}>
          <input
            ref="name"
            type="text"
            placeholder="name (required)"
            value={name}
            onChange={this._handleInputChange.bind(this, 'name')} />
        </div>
        <div style={{marginBottom: 5}}>
          <input
            type="text"
            placeholder="url (required)"
            value={url}
            onChange={this._handleInputChange.bind(this, 'url')} />
        </div>
        <div>
          <button
            disabled={buttonDisabled(name, url)}
            onClick={this._handleAdd}>
            Add
          </button>
          <button
            onClick={this.props.onDone}
            style={{marginLeft: 5}}>
            Done
          </button>
        </div>
      </div>
    )
  }
}

AddDefaultLibrary.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
}

export default AddDefaultLibrary

function buttonDisabled(name, url) {
  name = name.trim()
  url = url.trim()

  if (name && isUri(url)) return false
  return true
}
