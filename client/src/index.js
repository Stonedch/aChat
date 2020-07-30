import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store.js'
import { Navbar } from './components/Navbar/Navbar';
import { Provider } from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


