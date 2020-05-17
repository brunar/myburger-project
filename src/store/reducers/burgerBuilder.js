import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

//Typically name constants you want to use as GLOBAL constants in UPPERCASE
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                // This is good because you can add many types of ingredients
                //ingredients: action.ingredientsA,

                //But in this app burguer has a swicth case that is not prepared to works with new ingredients in the list
                //Optional - To order the list, salad first and not ordering from firebase
                ingredients: {
                    salad: action.ingredientsA.salad,
                    bacon: action.ingredientsA.bacon,
                    cheese: action.ingredientsA.cheese,
                    meat: action.ingredientsA.meat,
                },
                totalPrice: 4, //hardcode price same as initialState on top of the page
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;