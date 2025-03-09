import * as types from '../types';

const initialState = {
    isLoggedIn: false,
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST: {
            return { ...state, isLoading: true };
        }
        case types.LOGIN_SUCCESS: {
            return { ...state, isLoggedIn: true, isLoading: false };
        }
        case types.LOGIN_FAILURE: {
            return { ...state, isLoggedIn: false, isLoading: false };
        }
        case types.REGISTER_REQUEST: {
            const newState = { ...state };
            newState.isLoading = true;
            return newState;
        }

        case types.REGISTER_UPDATED_SUCCESS: {
            const newState = { ...state };
            newState.isLoading = false;
            return newState;
        }

        case types.REGISTER_CREATED_SUCCESS: {
            const newState = { ...state };
            newState.isLoading = false;
            return newState;
        }

        case types.REGISTER_FAILURE: {
            const newState = { ...state };
            newState.isLoading = false;
            return newState;
        }
        default:
            return state;
    }
}
