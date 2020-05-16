import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

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

export const setIngredients = (ingredientArg) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredientsA: ingredientArg
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    // this syntax is available due to redux-thunk
    return dispathBr => {
        axios.get('https://myburger-react-ea3fc.firebaseio.com/ingredients.json')
            .then(response => {
                dispathBr(setIngredients(response.data))
            })
            .catch(error => {
                dispathBr(fetchIngredientsFailed())
            });
    }
}