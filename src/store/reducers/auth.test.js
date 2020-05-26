import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            //my initial state from reducer
            {
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
            }
        );
    });

    it('should store the token upon login', () => {
        expect(reducer(
            //my initial state from reducer
            {
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
            }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token', //Just for test can be whatever value but the payload name is the same to the actions Auth.js
            userIdAct: 'some-user-id' //Payload Actions Name
        })).toEqual({
            token: 'some-token', //Need to be same value as above to the test don't fail 
            userId: 'some-user-id', //Need to be same value as above to the test don't fail 
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});