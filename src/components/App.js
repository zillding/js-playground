import React, { Component } from 'react'
import { Flex, Item } from 'react-flex'
import 'react-flex/index.css'

import '../style.css'

import MenuBar from '../containers/MenuBar'
import AddDefaultLibraryPanel from '../containers/AddDefaultLibraryPanel'
import LibraryListPanel from '../containers/LibraryListPanel'
import EditorArea from '../containers/EditorArea'
import NotificationSystem from './NotificationSystem'

const containerStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const editorContainerStyle = {
  position: 'relative'
}

const App = () => (
  <Flex
    column
    alignItems="stretch"
    style={containerStyle}
  >
    <Item flex={0}>
      <MenuBar/>
    </Item>
    <Item flex={0}>
      <AddDefaultLibraryPanel/>
    </Item>
    <Item flex={0}>
      <LibraryListPanel/>
    </Item>
    <Item style={editorContainerStyle}>
      <EditorArea/>
    </Item>
    <NotificationSystem/>
  </Flex>
)

export default App
