import { put } from 'redux-saga/effects';
import axios from '../../axios-order';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.tokenV, action.orderDataArgB);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderDataArgB));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart()); //To see the spinner for fisrt time while is starting.
    try {
        const queryParams = '?auth=' + action.tokenAu + '&orderBy="userId"&equalTo="' + action.userIdAu + '"'; //orderBy is from Firebase set
        const response = yield axios.get('/orders.json' + queryParams);

        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                //spread old object to make a new Object with id
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}