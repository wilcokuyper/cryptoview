import { FETCH_CURRENCIES, FETCH_PRICES } from '../actions/types';

const intialState = {
    types: [],
    prices: []
};

const currencyReducer = (state = intialState, action) => {
    switch(action.type) {
    case FETCH_CURRENCIES:
        return { ...state, types: action.payload };

    case FETCH_PRICES:
        return { ...state, prices: action.payload };

    default:
        return state;
    }
};

export default currencyReducer;