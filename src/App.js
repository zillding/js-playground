import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getPersistVimMode, setPersistVimMode } from './lib/persist';
import MenuBar from './MenuBar';
import Editor, { focusOnEditor } from './Editor';

toast.configure({
  position: toast.POSITION.BOTTOM_RIGHT
});

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};
const itemStyle = { flex: 0 };
const editorContainerStyle = {
  flex: 1,
  position: 'relative'
};

function App() {
  const [isVimEnabled, setIsVimEnabled] = useState(getPersistVimMode());

  return (
    <div style={containerStyle}>
      <div style={itemStyle}>
        <MenuBar
          editorVimModeEnabled={isVimEnabled}
          onToggleVimMode={() => {
            const value = !isVimEnabled;
            setIsVimEnabled(value);
            setPersistVimMode(value);
            focusOnEditor();
          }}
        />
      </div>
      <div style={editorContainerStyle}>
        <Editor vimModeOn={isVimEnabled} />
      </div>
    </div>
  );
}

export default App;
