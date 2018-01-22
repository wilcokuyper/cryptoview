import { LOGIN_REQUEST, FETCH_USER } from '../actions/types';

const initialState = {
  isAuthenticating: true,
  isAuthenticated: false,
  user: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return { ...state, isAuthenticating: true }

    case FETCH_USER:
      if (null !== action.payload) {
        return { isAuthenticating: false, isAuthenticated: true, user: action.payload }
      } else {
        return { ...state, isAuthenticating: false };
      }

    default:
      return state;
  }
}
