import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getPersistVimMode, setPersistVimMode } from './lib/persist';
import MenuBar from './MenuBar';
import Editor, { IEditor } from './Editor';

function App() {
  const [isVimEnabled, setIsVimEnabled] = useState(getPersistVimMode());
  const [editor, setEditor] = useState<IEditor>();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div style={{ flex: 0 }}>
        <MenuBar
          editor={editor}
          editorVimModeEnabled={isVimEnabled}
          onToggleVimMode={() => {
            const value = !isVimEnabled;
            setIsVimEnabled(value);
            setPersistVimMode(value);
            editor?.focus();
          }}
        />
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <Editor vimModeOn={isVimEnabled} onLoad={setEditor} />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
