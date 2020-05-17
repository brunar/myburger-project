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
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

// Async - Asynchronous action creators
export const purchaseBurger = (orderDataArgB) => {
    return dispatchIt => {

        dispatchIt(purchaseBurgerStart());

        axios.post('/orders.json', orderDataArgB)
            .then(response => {
                console.log(response.data);
                //response.data without .name is coming the id
                dispatchIt(purchaseBurgerSuccess(response.data.name, orderDataArgB));
            })
            .catch(error => {
                dispatchIt(purchaseBurgerFail(error));
            })
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

export const fetchOrders = () => {

    return dispatch => {
        dispatch(fetchOrdersStart()); //To see the spinner for fisrt time while is starting.

        axios.get('/orders.json')
            .then(res => {
                //Better format data in the actions than in the reducer
                //console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        //spread old object to make a new Object with id
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }

}