import axios from 'axios';
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

export const auth = (emailArg, passwordArg) => {
    //Need Redux Thunk - is Async
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: emailArg,
            password: passwordArg,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVOE8w6W1Lh-s7Pog58XvH8GrzGc4eHXc', authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
}