import React from 'react'
import { connect } from 'react-redux'

import { toggleLibraryList, addLibrary } from '../actions'
import defaultLibraries from '../libraries.config'

import LeftMenuBar from '../components/LeftMenuBar'
import RightMenuBar from '../components/RightMenuBar'

const MenuBar = ({
  libraryListIsOpen,
  libraries,
  onToggleLibraryList,
  onAddLibrary
}) => (
  <div style={{padding: 5}}>
    <LeftMenuBar
      defaultLibraries={defaultLibraries}
      onAddLibrary={onAddLibrary} />
    <RightMenuBar
      libraries={libraries}
      libraryListIsOpen={libraryListIsOpen}
      onToggleLibraryList={onToggleLibraryList} />
  </div>
)

const mapStateToProps = state => {
  return {
    libraryListIsOpen: state.libraryListIsOpen,
    libraries: state.libraries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddLibrary: library => dispatch(addLibrary(library)),
    onToggleLibraryList: () => dispatch(toggleLibraryList())
  }
}

const MenuBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)

export default MenuBarComponent
