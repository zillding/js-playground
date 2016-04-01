import React from 'react'
import find from 'lodash/find'

const RightMenuBar = ({ libraries, libraryListIsOpen, onToggleLibraryList }) => (
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
)

const Button = ({ libraryListIsOpen, onToggleLibraryList }) => {
  const label = libraryListIsOpen ? 'Hide Libraries' : 'Show Libraries'

  return (
    <button onClick={onToggleLibraryList}>
      {label}
    </button>
  )
}

export default RightMenuBar
