import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import App from './App';
import './index.css';

// bind modal to app root: http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
