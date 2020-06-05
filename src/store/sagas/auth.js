import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

// generator function from Next js Generators - function*

// in a generator should prefix, prepend each step we execute with the yield keyword
// This means that this step should be executed and then it will wait for it to finish
// so if it were an asynchronous action, it wouldn't continue before the step is done
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}