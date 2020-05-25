import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utitily';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}


const purchaseInit = (state, action) => {
    return updatedObject(state, { purchased: false });
}
const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, { loading: true });
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderDataRedu, { id: action.orderId });
    return updatedObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
        //In the order reducer, purchaseBurgerSuccess where I store this new order,
        //that doesn't really matter because we load orders from the server anyways when you visit the order page.
    });
}
const purchaseBurgerFail = (state, action) => {
    return updatedObject(state, { loading: false });
}
const fetchOrdersStart = (state, action) => {
    return updatedObject(state, { loading: true });
}
const fetchOrdersSuccess = (state, action) => {
    return updatedObject(state, {
        orders: action.ordersRedu,
        loading: false
    });
}
const fetchOrdersFail = (state, action) => {
    return updatedObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
}

export default reducer;