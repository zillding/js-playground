import React from 'react';

import '../style.css';

import MenuBar from '../containers/MenuBar';
import AddDefaultLibraryPanel from '../containers/AddDefaultLibraryPanel';
import LibraryListPanel from '../containers/LibraryListPanel';
import EditorArea from '../containers/EditorArea';
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
  position: 'relative'
};

const App = () => (
  <dik style={containerStyle}>
    <div style={itemStyle}>
      <MenuBar />
    </div>
    <div style={itemStyle}>
      <AddDefaultLibraryPanel />
    </div>
    <div style={itemStyle}>
      <LibraryListPanel />
    </div>
    <div style={editorContainerStyle}>
      <EditorArea />
    </div>
    <NotificationSystem />
  </dik>
);

export default App;
