// global: ace
import React, { Component, PropTypes } from 'react'
import debounce from 'debounce'

const editorStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%'
}

let editorInstance = null

class Editor extends Component {
  componentDidMount() {
    const editor = ace.edit('editor')
    editorInstance = editor
    editor.setTheme('ace/theme/monokai')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setKeyboardHandler('ace/keyboard/vim')
    editor.getSession().on('change', debounce(e => {
      this.props.onChange(editor.getValue())
    }, 500))
    editor.focus()
  }

  render() {
    return (
      <div
        id="editor"
        style={editorStyle} />
    )
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired
}

export function focusOnEditor() {
  if (editorInstance) editorInstance.focus()
}

export default Editor
