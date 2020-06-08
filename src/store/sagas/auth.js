import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

// Call function - makes your generators testable because you can easily mock this 
// and not really execute this code whilst you always need to execute it down there.

// generator function from Next js Generators - function*

// in a generator should prefix, prepend each step we execute with the yield keyword
// This means that this step should be executed and then it will wait for it to finish
// so if it were an asynchronous action, it wouldn't continue before the step is done
export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.emailArg,
        password: action.passwordArg,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVOE8w6W1Lh-s7Pog58XvH8GrzGc4eHXc';
    if (!action.isSignUpArg) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVOE8w6W1Lh-s7Pog58XvH8GrzGc4eHXc';
    }
    //Try if you can get success response otherwise catch error
    try {
        const response = yield axios.post(url, authData)
        //console.log(response);
        const expirationDateC = yield new Date(new Date().getTime() + response.data.expiresIn * 1000); //get new date + expiration Time is seconds than multiple to be a minutes
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDateC);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn)); //expiresIn property from firebase, same as localId and idToken
    } catch (err) {
        //console.log(err.response);
        yield put(actions.authFail(err.response.data.error)); //data.error coming from Firebase object Error Message
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout()); //Will be fixed to login In
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        //if expirationDate > today date
        if (expirationDate <= new Date()) {
            yield put(actions.logout()); //Will be fixed to login In
        } else {
            const userIdC = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userIdC));
            //The future date in seconds that's a big number and the current date in seconds and the difference of course is the expiry date, the expiry time in seconds 
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}