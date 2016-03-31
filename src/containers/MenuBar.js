import React from 'react'
import { connect } from 'react-redux'

import { toggleLibraryList, addLibrary } from '../actions'

import AddLibrary from '../components/AddLibrary'

const MenuBar = ({ libraryListIsOpen, onToggleLibraryList, onAddLibrary }) => (
  <div style={{padding: 5}}>
    <span style={{margin: 10}}>JS Playground</span>
    <select>
      // TODO: add default libraries
      <option value="jquery">jquery</option>
    </select>
    <AddLibrary onAdd={onAddLibrary} />
    <Button
      libraryListIsOpen={libraryListIsOpen}
      onToggleLibraryList={onToggleLibraryList} />
  </div>
)

const mapStateToProps = state => {
  return {
    libraryListIsOpen: state.libraryListIsOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddLibrary: url => dispatch(addLibrary(url)),
    onToggleLibraryList: () => dispatch(toggleLibraryList())
  }
}

const MenuBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)

export default MenuBarComponent

const Button = ({ libraryListIsOpen, onToggleLibraryList }) => {
  const style = {
    float: 'right'
  }
  const label = libraryListIsOpen ? 'Hide Libraries' : 'Show Libraries'

  return (
    <button
      onClick={onToggleLibraryList}
      style={style}>
      {label}
    </button>
  )
}
