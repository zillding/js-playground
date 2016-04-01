import React from 'react'
import { connect } from 'react-redux'

import { getPersistContent } from '../utils'
import { setEditorContent, evalText } from '../actions'
import { focusOnAddLibInput } from '../components/AddLibrary'

import Editor from '../components/Editor'

const buttonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 9999
}

const EditorArea = ({ editorContent, editorVimModeEnabled, onEditorContentChange }) => (
  <div>
    <button
      style={buttonStyle}
      onClick={() => evalText(editorContent)}>
      run
    </button>
    <Editor
      initText={getPersistContent()}
      vimModeOn={editorVimModeEnabled}
      onChange={onEditorContentChange}
      onRunRequest={evalText}
      onAddLibRequest={focusOnAddLibInput} />
  </div>
)

const mapStateToProps = (state) => {
  return {
    editorContent: state.editorContent,
    editorVimModeEnabled: state.editorVimModeEnabled
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
