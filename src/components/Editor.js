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
    const { initText = '', onChange, onRunRequest } = this.props

    const editor = ace.edit('editor')
    editorInstance = editor
    editor.setTheme('ace/theme/monokai')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setKeyboardHandler('ace/keyboard/vim')
    editor.getSession().on('change', debounce(e => {
      onChange(editor.getValue())
    }, 500))
    editor.commands.addCommand({
      name: 'myCommand',
      bindKey: {
        win: 'Ctrl-Enter',
        mac: 'Command-Enter'
      },
      exec: editor => onRunRequest(editor.getValue())
    })
    editor.$blockScrolling = Infinity // disable warning message
    editor.setValue(initText)
    editor.gotoLine(1)
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
  initText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRunRequest: PropTypes.func.isRequired
}

export function focusOnEditor() {
  if (editorInstance) editorInstance.focus()
}

export default Editor
