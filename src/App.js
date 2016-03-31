import React, { Component } from 'react'
import { Flex, Item } from 'react-flex'
require('react-flex/index.css')
import { connect } from 'react-redux'

import Editor from './Editor'
import { setEditorContent, evalText } from './actions'

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
    const { editorContent, onEditorContentChange } = this.props

    return (
      <Flex
        column
        alignItems={'stretch'}
        style={containerStyle}>
        <Item flex={0}>
          <div>Playground</div>
        </Item>
        <Item style={editorContainerStyle}>
          <button
            style={buttonStyle}
            onClick={() => evalText(editorContent)}>
            run
          </button>
          <Editor onChange={onEditorContentChange} />
        </Item>
      </Flex>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorContent: state.editorContent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditorContentChange: text => dispatch(setEditorContent(text))
  }
}

const AppComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppComponent
