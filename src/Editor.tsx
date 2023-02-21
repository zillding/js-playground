import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import isString from 'lodash/isString';
import { format } from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import AceEditor from 'react-ace';
import { toast } from 'react-toastify';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/keybinding-vim';

import { persistContent, getPersistContent } from './lib/persist';
import loadJs from './lib/loadJs';
import SearchLibraryModal from './SearchLibraryModal';

function evalText(text: string) {
  try {
    // eval the js code in the global context
    // so can access everything in the developer console
    const result = eval.call(window, text);

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

type Library = {
  url: string;
};

function getNextValue(value: string, libraries: Library[]) {
  const regex = /^\/\/@@\s+(\S*)/;
  const libs = libraries
    .map(({ url }) => `//@@ ${url}`)
    .join('\n')
    .trim();
  const content = value
    .split('\n')
    .filter((line: string) => !regex.test(line))
    .join('\n')
    .trim();
  return `${libs}\n\n${content}`;
}

type ToastProps = {
  title: string;
  text: string;
};

function Toast({ title, text }: ToastProps) {
  return (
    <div style={{ wordBreak: 'break-word' }}>
      {title && <strong>{title}</strong>}
      {title && text && <div style={{ height: 4 }} />}
      {text && <p style={{ margin: 0 }}>{text}</p>}
    </div>
  );
}

export interface IEditor {
  focus: () => void;
  getValue: () => string;
}

type EditorProps = {
  vimModeOn: boolean;
  onLoad: (o: IEditor) => void;
};

type EditorState = {
  value: string;
  modalIsOpen: boolean;
  libraries: Library[];
};

class Editor extends Component<EditorProps, EditorState> {
  state: EditorState = {
    value: getPersistContent(),
    modalIsOpen: false,
    libraries: [],
  };

  persist = debounce(persistContent, 500);
  commands = [
    {
      name: 'runCommand',
      bindKey: {
        win: 'Ctrl-Enter',
        mac: 'Command-Enter',
      },
      exec: (editor: IEditor) => evalText(editor.getValue()),
    },
    {
      name: 'clearCommand',
      bindKey: {
        win: 'Ctrl-k',
        mac: 'Command-k',
      },
      exec: clearConsole,
    },
    {
      name: 'searchLibCommand',
      bindKey: {
        win: 'Ctrl-o',
        mac: 'Command-o',
      },
      exec: () => {
        this.setState({ modalIsOpen: true });
      },
    },
    {
      name: 'formatCommand',
      bindKey: {
        win: 'Ctrl-s',
        mac: 'Command-s',
      },
      exec: (editor: IEditor) => {
        this.setState(({ libraries }) => {
          let value = getNextValue(editor.getValue(), libraries);
          try {
            value = format(value, {
              singleQuote: true,
              parser: 'babel',
              plugins: [parserBabel],
            });
          } catch (error) {
            console.error(error);
          }
          return { value };
        });
      },
    },
  ];

  onChange = (value: string) => {
    this.setState({ value });
    this.persist(value);
  };

  onAddLib = (url: string) => {
    const { libraries } = this.state;

    if (libraries.some((o) => o.url === url)) {
      toast.warn(<Toast title="The library is already loaded." text={url} />);
      return;
    }

    this.loadLib(url).then(() => {
      const { value, libraries } = this.state;
      this.onChange(getNextValue(value, libraries));
    });
  };

  loadLib(url: string) {
    return loadJs(url)
      .then(() => {
        toast.success(<Toast title="JS loaded!" text={url} />);
        this.setState(({ libraries }) => ({
          libraries: [...libraries, { url }],
        }));
      })
      .catch(() => {
        toast.error(<Toast title="JS load failed." text={url} />);
      });
  }

  loadLibs() {
    const { value } = this.state;

    const regex = /^\/\/@@\s+(\S*)/;
    value.split('\n').forEach((line) => {
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
      <>
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
            width: '100%',
          }}
          keyboardHandler={vimModeOn ? 'vim' : undefined}
          setOptions={{
            tabSize: 2,
            useWorker: false,
          }}
          commands={this.commands}
          value={value}
          onLoad={(o) => {
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
            zIndex: 9999,
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
      </>
    );
  }
}

export default Editor;
