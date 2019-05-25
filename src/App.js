import React from 'react';

import MenuBar from './MenuBar';
import LibraryListPanel from './LibraryListPanel';
import EditorArea from './EditorArea';
import NotificationSystem from './NotificationSystem';

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

const App = () => (
  <div style={containerStyle}>
    <div style={itemStyle}>
      <MenuBar />
    </div>
    <div style={itemStyle}>
      <LibraryListPanel />
    </div>
    <div style={editorContainerStyle}>
      <EditorArea />
    </div>
    <NotificationSystem />
  </div>
);

export default App;
