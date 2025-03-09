import { combineReducers } from 'redux';
import authReducer from './authReducer';
import currencyReducer from './currencyReducer';
import walletReducer from './walletReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    currencies: currencyReducer,
    wallet: walletReducer,
    form: formReducer
});
