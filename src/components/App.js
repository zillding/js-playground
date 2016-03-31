import React, { Component } from 'react'
import { Flex, Item } from 'react-flex'
require('react-flex/index.css')

import MenuBar from '../containers/MenuBar'
import EditorArea from '../containers/EditorArea'
import Modal from '../containers/Modal'
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
    alignItems={'stretch'}
    style={containerStyle}>
    <Item flex={0}>
      <MenuBar/>
    </Item>
    <Item style={editorContainerStyle}>
      <EditorArea/>
    </Item>
    <Modal/>
    <NotificationSystem/>
  </Flex>
)

export default App