import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'decentraland-ui/lib/styles.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


