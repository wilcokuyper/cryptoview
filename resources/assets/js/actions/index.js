import axios from 'axios';
import { LOGIN_REQUEST, FETCH_USER, FETCH_WALLET, UPDATE_WALLET, FETCH_CURRENCIES, FETCH_PRICES } from './types';

export const fetchUser = () => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  let res = null;
  try {
    res = await axios.get('/api/user');
  } catch(e) {
    res = { data: null };  
  }
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchWallet = () => async dispatch => {
  const res = await axios.get('/api/wallet');
  dispatch({ type: FETCH_WALLET, payload: res.data });
}

export const updateWalletItem = (values) => async dispatch => {
  const res = await axios.post('/api/wallet', values);
  dispatch({ type: UPDATE_WALLET, payload: res.data });
}

export const deleteWalletItem = (id) => async dispatch => {
  const res = await axios.delete(`/api/wallet/${id}`);
  dispatch({ type: UPDATE_WALLET, payload: res.data });
}

export const fetchCurrencies = () => async dispatch => {
  const res = await axios.get('/api/currencies');
  dispatch({ type: FETCH_CURRENCIES, payload: res.data });
}

export const fetchPrices = () => async dispatch => {
  const res = await axios.get('/api/prices');
  dispatch({ type: FETCH_PRICES, payload: res.data });
}
