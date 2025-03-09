import { FETCH_WALLET, UPDATE_WALLET, SET_SELECTED_ASSET } from '../actions/types';

const initialState = {
    assets: [],
    selectedAsset: {},
};

const walletReducer = (state = initialState, action) => {
    switch(action.type) {
    case FETCH_WALLET:
        return { ...state, assets: action.payload };

    case UPDATE_WALLET:
        return { ...state, assets: action.payload };

    case SET_SELECTED_ASSET:
        return { ...state, selectedAsset: action.payload };

    default:
        return state;
    }
};

export default walletReducer;