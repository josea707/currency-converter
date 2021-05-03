import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CurrencyState from './context/currencies/CurrencyState';
ReactDOM.render(
  <React.StrictMode>
    <CurrencyState>
    <App />
    </CurrencyState>
  </React.StrictMode>,
  document.getElementById('root')
);
