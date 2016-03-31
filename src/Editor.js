// global: ace
import React, { Component, PropTypes } from 'react'

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
    editor.getSession().on('change', e => {
      // TODO: add debounce
      this.props.onChange(editor.getValue())
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
  onChange: PropTypes.func.isRequired
}

export default Editor
