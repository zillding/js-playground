import React, { Component, PropTypes } from 'react'

import { generateNonDupInt } from '../lib/utils'

class DefaultLibraries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectClassName: ''
    }

    this._handleSelect = this._handleSelect.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.length !== prevProps.data.length) {
      // trigger a small animation
      this.setState({
        selectClassName: getClassName()
      });
    }
  }

  _handleSelect(e) {
    const { data, onSelect } = this.props
    const index = e.target.value
    onSelect(data[index])
  }

  render() {
    return (
      <select
        className={this.state.selectClassName}
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

function getClassName() {
  // generate a random non duplicated
  // animate class name
  const classArray = [
    'flash',
    'pulse',
    'rubberBand',
    'shake',
    'headShake',
    'swing',
    'tada',
    'wobble',
    'jello'
  ]
  const index = generateNonDupInt(0, classArray.length - 1)
  return `animated ${classArray[index]}`
}
