import React, { Component, PropTypes } from 'react'

const LibraryList = ({ libraries }) => {
  return (
    <ul>
      {
        libraries.map(({ url }) => (
          <li key={url}>
            <a href={url}>{url}</a>
          </li>
        ))
      }
    </ul>
  )
}

export default LibraryList
