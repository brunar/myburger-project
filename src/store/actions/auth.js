import axios from 'axios';
import * as actionsTypes from './actionTypes';

// To set a loading state and show a spinner
export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    };
}

export const authSuccess = (tokenArg, userIdArg) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        idToken: tokenArg,
        userIdAct: userIdArg
    };
}

export const authFail = (errorArg) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        errorAct: errorArg
    };
}

export const auth = (emailArg, passwordArg, isSignUpArg) => {
    //Need Redux Thunk - is Async
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: emailArg,
            password: passwordArg,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVOE8w6W1Lh-s7Pog58XvH8GrzGc4eHXc';
        if (!isSignUpArg) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVOE8w6W1Lh-s7Pog58XvH8GrzGc4eHXc';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err.response);
                dispatch(authFail(err.response.data.error)); //data.error coming from Firebase object Error Message
            });
    };
}