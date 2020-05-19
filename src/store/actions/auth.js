import * as actionsTypes from './actionTypes';

// To set a loading state and show a spinner
export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    };
}

export const authSuccess = (authDataArg) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        authData: authDataArg
    };
}

export const authFail = (errorArg) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: errorArg
    };
}

export const auth = (email, password) => {
    //Need Redux Thunk - is Async
    return dispatch => {
        dispatch(authStart());
    };
}