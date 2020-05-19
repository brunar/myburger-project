import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utitily';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updatedObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updatedObject(state, {
        token: action.idToken,
        userId: action.userIdAct,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.errorAct,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        default: return state;
    }
}

export default reducer;
