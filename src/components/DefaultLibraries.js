import React, { Component, PropTypes } from 'react'

class DefaultLibraries extends Component {
  constructor(props) {
    super(props)

    this._handleSelect = this._handleSelect.bind(this)
  }

  _handleSelect(e) {
    const { data, onSelect } = this.props
    const index = e.target.value
    onSelect(data[index])
  }

  render() {
    return (
      <select
        value="default"
        onChange={this._handleSelect}>
        <option value="default">Add Library</option>
        {
          this.props.data.map((lib, index) => (
            <option key={index} value={index}>
              {lib.name || lib.url}
            </option>
          ))
        }
      </select>
    )
  }
}

DefaultLibraries.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default DefaultLibraries
