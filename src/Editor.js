// global: ace
import React, { Component, PropTypes } from 'react'
import debounce from 'debounce'

const editorStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%'
}

class Editor extends Component {
  componentDidMount() {
    const editor = ace.edit('editor')
    editor.setTheme('ace/theme/monokai')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setKeyboardHandler('ace/keyboard/vim')
    editor.getSession().on('change', debounce(e => {
      this.props.onChange(editor.getValue())
    }, 500))
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

export default Editor
