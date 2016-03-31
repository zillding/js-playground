import React from 'react'

import LibraryItem from './LibraryItem'

const LibraryList = ({ libraries }) => {
  return (
    <ul>
      {
        libraries.map((library, index) =>
          <LibraryItem
            key={index}
            data={library} />
        )
      }
    </ul>
  )
}

export default LibraryList
