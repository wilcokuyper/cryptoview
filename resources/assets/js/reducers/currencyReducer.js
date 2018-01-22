import { FETCH_CURRENCIES, FETCH_PRICES } from '../actions/types';

const intialState = {
  types: [],
  prices: []
}

export default (state = intialState, action) => {
  switch(action.type) {
    case FETCH_CURRENCIES:
      return { ...state, types: action.payload };

    case FETCH_PRICES:
      return { ...state, prices: action.payload };

    default:
      return state;
  }
}
