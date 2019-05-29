import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MenuBar from './MenuBar';
import Editor from './Editor';

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

const App = () => (
  <div style={containerStyle}>
    <div style={itemStyle}>
      <MenuBar />
    </div>
    <div style={editorContainerStyle}>
      <Editor />
    </div>
  </div>
);

export default App;
