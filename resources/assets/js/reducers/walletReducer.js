import { FETCH_WALLET, UPDATE_WALLET } from '../actions/types';

export default (state = [], action) => {
  switch(action.type) {
    case FETCH_WALLET:
      return action.payload;

    case UPDATE_WALLET:
      return action.payload;

    default:
      return state;
  }
}
