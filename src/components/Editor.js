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
    const {
      initText = '',
      vimModeOn,
      onChange,
      onRunRequest,
      onClearRequest,
      onAddLibRequest
    } = this.props

    const editor = ace.edit('editor')
    editorInstance = editor
    editor.setTheme('ace/theme/monokai')
    editor.getSession().setMode('ace/mode/javascript')
    editor.getSession().setTabSize(2)
    if (vimModeOn) editor.setKeyboardHandler('ace/keyboard/vim')
    editor.getSession().on('change', debounce(e => {
      onChange(editor.getValue())
    }, 500))
    editor.commands.addCommand({
      name: 'runCommand',
      bindKey: {
        win: 'Ctrl-Enter',
        mac: 'Command-Enter'
      },
      exec: editor => onRunRequest(editor.getValue())
    })
    editor.commands.addCommand({
      name: 'clearCommand',
      bindKey: {
        win: 'Ctrl-k',
        mac: 'Command-k'
      },
      exec: editor => onClearRequest()
    })
    editor.commands.addCommand({
      name: 'addLibCommand',
      bindKey: {
        win: 'Ctrl-p',
        mac: 'Command-p'
      },
      exec: onAddLibRequest
    })
    editor.$blockScrolling = Infinity // disable warning message
    editor.setValue(initText)
    this._loadLibs()
    const row = editor.session.getLength()
    editor.gotoLine(row)
    editor.focus()
  }

  componentWillReceiveProps({ vimModeOn }) {
    if (!editorInstance) return
    if (vimModeOn)
      return editorInstance.setKeyboardHandler('ace/keyboard/vim')
    return editorInstance.setKeyboardHandler('')
  }

  _loadLibs() {
    const { initText, onLoadLibraryRequest } = this.props
    const regex = /^\/\/ @@LOAD_SCRIPT\((.*)\)/
    initText.split('\n').map(line => {
      const [, url] = regex.exec(line) || []
      if (url) {
        onLoadLibraryRequest(url)
      }
    })
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
  vimModeOn: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onRunRequest: PropTypes.func.isRequired,
  onClearRequest: PropTypes.func.isRequired,
  onAddLibRequest: PropTypes.func.isRequired,
  onLoadLibraryRequest: PropTypes.func.isRequired
}

export function focusOnEditor() {
  if (editorInstance) editorInstance.focus()
}

export default Editor
