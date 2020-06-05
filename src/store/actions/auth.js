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
export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionsTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionsTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
        //expiration time is in our checkAuthTimeoutSaga (I do not refer to the argument expirationTime, but to the action)
    }
}
export const auth = (emailArg, passwordArg, isSignUpArg) => {
    return {
        type: actionsTypes.AUTH_USER,
        emailArg: emailArg,
        passwordArg: passwordArg,
        isSignUpArg: isSignUpArg
    }
}

export const setAuthRedirectPath = (pathArg) => {
    return {
        type: actionsTypes.SET_AUTH_REDIRECT_PATH,
        path: pathArg
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout()); //Will be fixed to login In
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            //if expirationDate > today date
            if (expirationDate <= new Date()) {
                dispatch(logout()); //Will be fixed to login In
            } else {
                const userIdC = localStorage.getItem('userId');
                dispatch(authSuccess(token, userIdC));
                //The future date in seconds that's a big number and the current date in seconds and the difference of course is the expiry date, the expiry time in seconds 
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}