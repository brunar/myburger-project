import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utitily'; // Export objects need curly braces

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

//Typically name constants you want to use as GLOBAL constants in UPPERCASE
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    //The 2nd Argument has to be an object because is what utility.js expect
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    //The 2nd Argument has to be an object because is what utility.js expect
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredientsA.salad,
            bacon: action.ingredientsA.bacon,
            cheese: action.ingredientsA.cheese,
            meat: action.ingredientsA.meat,
        },
        totalPrice: 4, //hardcode price same as initialState on top of the page
        error: false,
        building: false
    });
    // This is good because you can add many types of ingredients
    // Example: ingredients: action.ingredientsA,
    // But in this app burguer has a swicth case that is not prepared to works with new ingredients in the list
    // Optional - To order the list, salad first and not ordering from firebase
}

const fecthIngredientsFailed = (state, action) => {
    return updatedObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fecthIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;