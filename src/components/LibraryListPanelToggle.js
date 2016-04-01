import React from 'react'

const LibraryListPanelToggle = ({ libraryListIsOpen, onToggleLibraryList }) => {
  const label = libraryListIsOpen ? 'Hide Libraries' : 'Show Libraries'

  return (
    <button
      style={{marginLeft: 5}}
      onClick={onToggleLibraryList}>
      {label}
    </button>
  )
}

export default LibraryListPanelToggle
