import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

// Synchronous action creators
export const purchaseBurgerSuccess = (id, orderDataArg) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCESS,
        orderId: id,
        orderDataRedu: orderDataArg
    }
};

// Synchronous action creators
export const purchaseBurgerFail = (errorArg) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: errorArg
    }
};

// Async - Asynchronous action creators

export const purchaseBurgerStart = (orderDataArgB) => {
    return dispatchIt => {
        axios.post('/orders.json', orderDataArgB)
            .then(response => {
                console.log(response.data);
                dispatchIt(purchaseBurgerSuccess(response.data, orderDataArgB));
            })
            .catch(error => {
                dispatchIt(purchaseBurgerFail());
            })
    }
};