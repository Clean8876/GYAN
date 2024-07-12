import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import rootReducer from './reducer/root.js';
import {Toaster } from 'react-hot-toast'

import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
const store  = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
