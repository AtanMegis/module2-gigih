import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Page/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Home />
    <ToastContainer/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);