import { LOGIN_REQUEST, FETCH_USER } from '../actions/types'

const initialState = {
  isAuthenticating: true,
  isAuthenticated: false,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isAuthenticating: true }

    case FETCH_USER:
      if (action.payload !== null) {
        return {
          isAuthenticating: false,
          isAuthenticated: true,
          user: action.payload,
        }
      }
      return { ...state, isAuthenticating: false }

    default:
      return state
  }
}

export default authReducer
