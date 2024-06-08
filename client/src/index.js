import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'; // Dodaj ten import

import { Link } from 'react-router-dom'; // Upewnij się, że masz ten import

ReactDOM.render(
    <Router>
    <App />
  </Router>,
  document.getElementById('root')
)


