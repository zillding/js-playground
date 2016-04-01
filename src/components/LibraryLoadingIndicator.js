import React from 'react'
import find from 'lodash/find'

const LibraryLoadingIndicator = ({ libraries }) => {
  if (find(libraries, { status: 'loading' }))
    return (
      <i className="fa fa-spinner fa-pulse"></i>
    )

  return (
    <i className="fa fa-check"></i>
  )
}

export default LibraryLoadingIndicator
