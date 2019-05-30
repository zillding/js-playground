import React, { Component, Fragment } from 'react';
import debounce from 'lodash/debounce';
import isString from 'lodash/isString';
import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babylon';
import AceEditor from 'react-ace';
import { toast } from 'react-toastify';

import { persistContent, getPersistContent } from './lib/persist';
import loadJs from './lib/loadJs';
import SearchLibraryModal from './SearchLibraryModal';

function evalText(text) {
  try {
    // eval the js code in the global context
    // so can access everything in the developer console
    const result = eval.call(window, text); // eslint-disable-line no-eval

    console.log(
      '%c→',
      'color: darkgrey',
      isString(result) ? JSON.stringify(result) : result
    );
  } catch (error) {
    console.error(error);
  }
}

function clearConsole() {
  console.clear && console.clear();
}

function getNextValue(value, libraries) {
  const regex = /^\/\/@@\s+(\S*)/;
  const libs = libraries
    .map(({ url }) => `//@@ ${url}`)
    .join('\n')
    .trim();
  const content = value
    .split('\n')
    .filter(line => !regex.test(line))
    .join('\n')
    .trim();
  return `${libs}\n\n${content}`;
}

function Toast({ title, text }) {
  return (
    <div style={{ wordBreak: 'break-word' }}>
      {title && <strong>{title}</strong>}
      {title && text && <div style={{ height: 4 }} />}
      {text && <p style={{ margin: 0 }}>{text}</p>}
    </div>
  );
}

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: getPersistContent(),
      modalIsOpen: false,
      libraries: []
    };
  }

  persist = debounce(persistContent, 500);
  commands = [
    {
      name: 'runCommand',
      bindKey: {
        win: 'Ctrl-Enter',
        mac: 'Command-Enter'
      },
      exec: editor => evalText(editor.getValue())
    },
    {
      name: 'clearCommand',
      bindKey: {
        win: 'Ctrl-k',
        mac: 'Command-k'
      },
      exec: clearConsole
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
      exec: editor => {
        this.setState(({ libraries }) => ({
          value: prettier.format(getNextValue(editor.getValue(), libraries), {
            parser: 'babel',
            plugins: [babylon]
          })
        }));
      }
    }
  ];

  onChange = value => {
    this.setState({ value });
    this.persist(value);
  };

  onAddLib = url => {
    const { libraries } = this.state;

    if (libraries.some(o => o.url === url)) {
      toast.warn(<Toast title="The library is already loaded." text={url} />);
      return;
    }

    this.loadLib(url).then(() => {
      const { value, libraries } = this.state;
      this.onChange(getNextValue(value, libraries));
    });
  };

  loadLib(url) {
    return loadJs(url)
      .then(() => {
        toast.success(<Toast title="JS loaded!" text={url} />);
        this.setState(({ libraries }) => ({
          libraries: [...libraries, { url }]
        }));
      })
      .catch(() => {
        toast.error(<Toast title="JS load failed." text={url} />);
      });
  }

  loadLibs() {
    const { value } = this.state;

    const regex = /^\/\/@@\s+(\S*)/;
    value.split('\n').forEach(line => {
      const [, url] = regex.exec(line) || [];
      if (url) {
        this.loadLib(url);
      }
    });
  }

  render() {
    const { vimModeOn, onLoad } = this.props;
    const { value, modalIsOpen } = this.state;

    return (
      <Fragment>
        <AceEditor
          mode="javascript"
          theme="monokai"
          focus
          enableBasicAutocompletion
          enableLiveAutocompletion
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
          commands={this.commands}
          value={value}
          onLoad={o => {
            onLoad(o);
            this.loadLibs();
          }}
          onChange={this.onChange}
        />

        <button
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 9999
          }}
          onClick={() => {
            evalText(value);
          }}
        >
          run
        </button>

        <SearchLibraryModal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            this.setState({ modalIsOpen: false });
          }}
          onAdd={this.onAddLib}
        />
      </Fragment>
    );
  }
}

export default Editor;
