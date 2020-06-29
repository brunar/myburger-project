import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; //Ex It replaces the connect HOC from React-Redux

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

    //useSelector is relative of mapStateToProps
    const ings = useSelector(state => {
        return state.burgerBuilderSS.ingredients
    });
    const pprice = useSelector(state => state.burgerBuilderSS.totalPrice);
    const error = useSelector(state => state.burgerBuilderSS.error);
    const isAuthenticated = useSelector(state => state.authSS.token !== null);

    //useDispatch is relative of mapDispatchToProps
    const dispatch = useDispatch();
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));

    // useCallback here is crucial to avoid infinite loop
    // we ensure that on init ingredients actually will cache the value. This function here and
    // not recreate this functional object for every recreation or every rendering of this component
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]);

    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    //componentDidMount lifecycle method to fetching the data
    //const { onInitIngredients } = props; //can be removed because the props won't be via connect, but useDispatch
    useEffect(() => {
        //console.log(onInitIngredients);
        onInitIngredients();
    }, [onInitIngredients]);

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
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }
    const purchaseHandlerCancel = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }


    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    };//This will bring {salad:true, meat:false, ...}

    let orderSummary = null;

    let burger = error ? <p>Ingredients can not be loaded!</p> : <Spinner />

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasebr={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                    price={pprice} />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredientsorder={ings}
            price={pprice}
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

export default withErrorHandler(BurgerBuilder, axios);