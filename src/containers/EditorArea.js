import React from 'react'
import { connect } from 'react-redux'

import { setEditorContent, evalText } from '../actions'

import Editor from '../components/Editor'

const buttonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 9999
}

const EditorArea = ({ editorContent, onEditorContentChange }) => (
  <div>
    <button
      style={buttonStyle}
      onClick={() => evalText(editorContent)}>
      run
    </button>
    <Editor onChange={onEditorContentChange} />
  </div>
)

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

const EditorAreaComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorArea)

export default EditorAreaComponent
