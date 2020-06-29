import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; //index could be omitted here.
import axios from '../../axios-order';


export const BurgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // } 
    const [purchasing, setPurchasing] = useState(false);

    //componentDidMount lifecycle method to fetching the data
    useEffect(() => {
        //console.log(props);
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        //creating an Array for ingredients each el ex double cheese
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            //Reduce to a single number, the sum of all ingredients
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }
    const purchaseHandlerCancel = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }


    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    };//This will bring {salad:true, meat:false, ...}

    let orderSummary = null;

    let burger = props.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasebr={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    price={props.pprice} />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredientsorder={props.ings}
            price={props.pprice}
            purchaseCancelled={purchaseHandlerCancel}
            purchaseContinued={purchaseContinueHandler} />;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseHandlerCancel}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}
const mapStateToProps = state => {
    // burgerBuilderSS was declared at combineReducers on Index.js/App
    return {
        ings: state.burgerBuilderSS.ingredients,
        pprice: state.burgerBuilderSS.totalPrice,
        error: state.burgerBuilderSS.error,
        isAuthenticated: state.authSS.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));