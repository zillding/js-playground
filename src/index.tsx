import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import App from './App';
import './index.css';

// bind modal to app root: http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
