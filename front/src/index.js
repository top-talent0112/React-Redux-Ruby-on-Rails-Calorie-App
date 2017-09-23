import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/react-datetime/css/react-datetime.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
