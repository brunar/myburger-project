import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    //Properties should be same name using in mapDispatchToProps
    //Mandatory type from redux packg
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}