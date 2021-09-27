// BRING IN REACT MODULES
import React from 'react';
import ReactDOM from 'react-dom';

// BRING IN BOOTSTRAP AND STYLESHEET
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// BRING IN APP COMPONENT
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
