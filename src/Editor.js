import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babylon';
import AceEditor from 'react-ace';

import SearchLibraryModal from './SearchLibraryModal';

let editorInstance = null;

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initText,
      modalIsOpen: false
    };
  }

  onChange = value => {
    this.setState({ value });
    this.props.onChange(value);
  };

  loadLibs() {
    const { initText, onLoadLibraryRequest } = this.props;
    const regex = /^\/\/@@\s+(\S*)/;
    initText.split('\n').forEach(line => {
      const [, url] = regex.exec(line) || [];
      if (url) {
        onLoadLibraryRequest(url);
      }
    });
  }

  render() {
    const {
      vimModeOn,
      onRunRequest,
      onClearRequest,
      onLoadLibraryRequest
    } = this.props;
    const { value, modalIsOpen } = this.state;

    return (
      <Fragment>
        <AceEditor
          mode="javascript"
          theme="monokai"
          focus
          enableBasicAutocompletion
          editorProps={{ $blockScrolling: Infinity }}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%'
          }}
          keyboardHandler={vimModeOn ? 'vim' : undefined}
          setOptions={{
            tabSize: 2
          }}
          commands={[
            {
              name: 'runCommand',
              bindKey: {
                win: 'Ctrl-Enter',
                mac: 'Command-Enter'
              },
              exec: editor => onRunRequest(editor.getValue())
            },
            {
              name: 'clearCommand',
              bindKey: {
                win: 'Ctrl-k',
                mac: 'Command-k'
              },
              exec: () => onClearRequest()
            },
            {
              name: 'searchLibCommand',
              bindKey: {
                win: 'Ctrl-o',
                mac: 'Command-o'
              },
              exec: () => {
                this.setState({ modalIsOpen: true });
              }
            },
            {
              name: 'formatCommand',
              bindKey: {
                win: 'Ctrl-s',
                mac: 'Command-s'
              },
              exec: editor =>
                editor.setValue(
                  prettier.format(editor.getValue(), {
                    parser: 'babel',
                    plugins: [babylon]
                  })
                )
            }
          ]}
          value={value}
          onLoad={o => {
            editorInstance = o;
            this.loadLibs();
          }}
          onChange={this.onChange}
        />

        <SearchLibraryModal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            this.setState({ modalIsOpen: false });
          }}
          onAdd={onLoadLibraryRequest}
        />
      </Fragment>
    );
  }
}

Editor.propTypes = {
  initText: PropTypes.string,
  vimModeOn: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onRunRequest: PropTypes.func.isRequired,
  onClearRequest: PropTypes.func.isRequired,
  onLoadLibraryRequest: PropTypes.func.isRequired
};

export function focusOnEditor() {
  if (editorInstance) editorInstance.focus();
}

export default Editor;
