import React from 'react'
import { connect } from 'react-redux'
import find from 'lodash/find'

import { toggleLibraryList, addLibrary } from '../actions'

import AddLibrary from '../components/AddLibrary'

const MenuBar = ({
  libraryListIsOpen,
  libraries,
  onToggleLibraryList,
  onAddLibrary
}) => (
  <div style={{padding: 5}}>
    <span style={{margin: 10}}>JS Playground</span>
    <select style={{marginRight: 10}}>
      <option>Add Library</option>
      <option value="jquery">jquery</option>
    </select>
    <AddLibrary onAdd={onAddLibrary} />
    <div style={{float: 'right'}}>
      {
        find(libraries, { status: 'loading' }) ?
          <i
            className="fa fa-spinner fa-pulse"
            style={{marginRight: 5}}></i> :
          null
      }
      {
        libraries.length > 0 ?
          <Button
            libraryListIsOpen={libraryListIsOpen}
            onToggleLibraryList={onToggleLibraryList} /> :
          null
      }
    </div>
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
  const label = libraryListIsOpen ? 'Hide Libraries' : 'Show Libraries'

  return (
    <button onClick={onToggleLibraryList}>
      {label}
    </button>
  )
}
