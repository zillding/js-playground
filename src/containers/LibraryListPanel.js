import React from 'react'
import { connect } from 'react-redux'

import LibraryList from '../components/LibraryList'

const LibraryListPanel = ({ libraryListIsOpen, libraries }) => {
  if (!libraryListIsOpen) return <div/>

  return (
    <div style={{padding: 10}}>
      <strong>External Libraries</strong>
      <LibraryList libraries={libraries} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    libraryListIsOpen: state.libraryListIsOpen,
    libraries: state.libraries
  }
}

const Panel = connect(
  mapStateToProps
)(LibraryListPanel)

export default Panel
