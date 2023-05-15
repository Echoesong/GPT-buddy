import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css'

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  

  
  <Router>
    <App />
  </Router>
  
);

