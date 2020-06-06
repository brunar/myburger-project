import * as actionTypes from './actionTypes';

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
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

// Async - Asynchronous action creators
export const purchaseBurger = (orderDataArgB, tokenV) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderDataArgB: orderDataArgB,
        tokenV: tokenV
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (ordersArg) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCESS,
        ordersRedu: ordersArg
    }
}

export const fetchOrdersFail = (errorArg) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        errorRedu: errorArg
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (tokenAu, userIdAu) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        tokenAu: tokenAu,
        userIdAu: userIdAu
    }
}