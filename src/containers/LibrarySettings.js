import React from 'react'
import { connect } from 'react-redux'

import { addLibrary } from '../actions'

import AddLibrary from '../components/AddLibrary'
import LibraryList from '../components/LibraryList'

const LibrarySettings = ({
  libraries,
  onAddLibrary
}) => (
  <div>
    <h3>External Libraries</h3>
    <AddLibrary onAdd={onAddLibrary} />
    <LibraryList libraries={libraries} />
  </div>
)

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

const LibrarySettingsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LibrarySettings)

export default LibrarySettingsComponent
