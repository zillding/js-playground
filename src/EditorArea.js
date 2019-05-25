import React from 'react';
import { connect } from 'react-redux';

import { getPersistContent } from './lib/utils';
import {
  setEditorContent,
  evalText,
  clearConsole,
  addLibrary
} from './actions';

import Editor from './Editor';

const buttonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 9999
};

const EditorArea = ({
  editorContent,
  editorVimModeEnabled,
  onEditorContentChange,
  onLoadLibraryRequest
}) => (
  <div>
    <button style={buttonStyle} onClick={() => evalText(editorContent)}>
      run
    </button>
    <Editor
      initText={getPersistContent()}
      vimModeOn={editorVimModeEnabled}
      onChange={onEditorContentChange}
      onRunRequest={evalText}
      onClearRequest={clearConsole}
      onLoadLibraryRequest={onLoadLibraryRequest}
    />
  </div>
);

const mapStateToProps = state => {
  return {
    editorContent: state.editorContent,
    editorVimModeEnabled: state.editorVimModeEnabled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditorContentChange: text => dispatch(setEditorContent(text)),
    onLoadLibraryRequest: url => dispatch(addLibrary({ url }))
  };
};

const EditorAreaComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorArea);

export default EditorAreaComponent;
