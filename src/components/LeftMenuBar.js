import React from 'react'

import AddLibrary from '../components/AddLibrary'
import DefaultLibraries from '../components/DefaultLibraries'

const LeftMenuBar = ({ defaultLibraries, onAddLibrary }) => (
  <span>
    <span>JS Playground</span>
    <Seperator margin={10} />
    <DefaultLibraries
      data={defaultLibraries}
      onSelect={onAddLibrary} />
    <Seperator margin={10} />
    <AddLibrary onAdd={onAddLibrary} />
  </span>
)

const Seperator = ({ margin }) => {
  const style = {
    marginLeft: margin || 5,
    marginRight: margin || 5
  }

  return <span style={style}>|</span>
}

export default LeftMenuBar
