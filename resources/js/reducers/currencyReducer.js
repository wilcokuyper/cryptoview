import { FETCH_PRICES } from '../actions/types'

const initialState = {
  types: [],
  prices: [],
}

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRICES:
      return { ...state, prices: action.payload }

    default:
      return state
  }
}

export default currencyReducer
