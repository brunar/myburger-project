import { put } from 'redux-saga/effects';

import * as actionsTypes from '../actions/actionTypes';

// generator function from Next js Generators - function*

// in a generator should prefix, prepend each step we execute with the yield keyword
// This means that this step should be executed and then it will wait for it to finish
// so if it were an asynchronous action, it wouldn't continue before the step is done
export function* logoutSaga(actions) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionsTypes.AUTH_LOGOUT
    });
}