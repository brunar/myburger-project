import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utitily';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updatedObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updatedObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCESS:
            const newOrder = updatedObject(action.orderDataRedu, { id: action.orderId });
            return updatedObject(state, {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
                //In the order reducer, purchaseBurgerSuccess where I store this new order,
                //that doesn't really matter because we load orders from the server anyways when you visit the order page.
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updatedObject(state, { loading: false });
        case actionTypes.FETCH_ORDERS_START:
            return updatedObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCESS:
            return updatedObject(state, {
                orders: action.ordersRedu,
                loading: false
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updatedObject(state, { loading: false });
        default:
            return state;
    }
}

export default reducer;