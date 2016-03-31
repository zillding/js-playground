import React, { Component } from 'react'
import { Flex, Item } from 'react-flex'
require('react-flex/index.css')
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { setEditorContent, toggleModal, evalText } from '../actions'

import Editor from '../components/Editor'
import ModalContent from './ModalContent'

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

const buttonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 9999
}

class App extends Component {
  render() {
    const {
      editorContent,
      modalIsOpen,
      onEditorContentChange,
      onToggleModal
    } = this.props

    return (
      <Flex
        column
        alignItems={'stretch'}
        style={containerStyle}>
        <Item flex={0}>
          <span style={{margin: 10}}>Playground</span>
          <button onClick={onToggleModal}>Libraries</button>
        </Item>
        <Item style={editorContainerStyle}>
          <button
            style={buttonStyle}
            onClick={() => evalText(editorContent)}>
            run
          </button>
          <Editor onChange={onEditorContentChange} />
        </Item>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={onToggleModal}>
          <ModalContent/>
        </Modal>
      </Flex>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorContent: state.editorContent,
    modalIsOpen: state.modalIsOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditorContentChange: text => dispatch(setEditorContent(text)),
    onToggleModal: () => dispatch(toggleModal())
  }
}

const AppComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppComponent
