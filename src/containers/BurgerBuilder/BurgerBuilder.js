import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index'; //index could be omitted here.
import axios from '../../axios-order';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    //Ingredients has to have same key-words(salad,bacon,cheese) that are using in the switch cases();
    state = {
        purchasing: false
    }
    //componentDidMount lifecycle method to fetching the data
    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
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

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseHandlerCancel = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };//This will bring {salad:true, meat:false, ...}

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasebr={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.pprice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredientsorder={this.props.ings}
                price={this.props.pprice}
                purchaseCancelled={this.purchaseHandlerCancel}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandlerCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}
const mapStateToProps = state => {
    // burgerBuilderSS was declared at combineReducers on Index.js/App
    return {
        ings: state.burgerBuilderSS.ingredients,
        pprice: state.burgerBuilderSS.totalPrice,
        error: state.burgerBuilderSS.error
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));