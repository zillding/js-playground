import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
