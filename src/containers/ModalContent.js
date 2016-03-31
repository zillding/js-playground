import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addLibrary } from '../actions'

import AddLibrary from '../components/AddLibrary'
import LibraryList from '../components/LibraryList'

class ModalContent extends Component {
  render() {
    const { libraries, onAddLibrary } = this.props

    return (
      <div>
        <div>External Libraries</div>
        <AddLibrary onAdd={onAddLibrary} />
        <LibraryList libraries={libraries} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    libraries: state.libraries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddLibrary: url => dispatch(addLibrary(url))
  }
}

const ModalContentComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContent)

export default ModalContentComponent
