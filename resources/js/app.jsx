/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap'

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'

import App from './Components/App'
import authReducer from './reducers/authReducer'
import currencyReducer from './reducers/currencyReducer'
import walletReducer from './reducers/walletReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    currencies: currencyReducer,
    wallet: walletReducer,
    form: formReducer,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
