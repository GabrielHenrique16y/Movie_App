import * as types from '../types';

export function login_request(payload) {
    return {
        type: types.LOGIN_REQUEST,
        payload,
    };
}

export function login_success() {
    return {
        type: types.LOGIN_SUCCESS,
    };
}

export function login_failure(payload) {
    return {
        type: types.LOGIN_FAILURE,
        payload,
    };
}

export function registerRequest(payload) {
    return {
        type: types.REGISTER_REQUEST,
        payload,
    };
}

export function registerUpdatedSuccess() {
    return {
        type: types.REGISTER_UPDATED_SUCCESS,
    };
}

export function registerCreatedSuccess(payload) {
    return {
        type: types.REGISTER_CREATED_SUCCESS,
        payload,
    };
}

export function registerFailure(payload) {
    return {
        type: types.REGISTER_FAILURE,
        payload,
    };
}
