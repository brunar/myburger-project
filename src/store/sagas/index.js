import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

// all() function - is another nice option if you want to run multiple generators or multiple tasks simultaneously.
export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga); //takeLatest 
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}
// If the user hammers the purchase burger button, we maybe only always want to use the latest click,
// takeLatest will automatically cancel any ongoing executions of purchaseBurgerSaga and always only execute the latest one.
// which you might need from time to time to make sure that only one of these
// processes here is going on at a time. With takeEvery, it will execute fetchOrdersSaga
// whenever this action type is detected, with takeLatest, it won't.