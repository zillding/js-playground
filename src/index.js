import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';

// bind modal to app root: http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
