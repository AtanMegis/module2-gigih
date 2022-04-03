import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Page/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


ReactDOM.render(
  <React.StrictMode>
    <Home />
    <ToastContainer/>
  </React.StrictMode>,
  document.getElementById('root')
);