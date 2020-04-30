import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

//Typically name constants you want to use as GLOBAL constants in UPPERCASE
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    //Ingredients has to have same key-words(salad,bacon,cheese) that are using in the switch cases();
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    //componentDidMount lifecycle method to fetching the data
    componentDidMount() {
        console.log(this.props);

        axios.get('https://myburger-react-ea3fc.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
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
        this.setState({ purchaseable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const UpdatedCount = oldCount + 1;
        const UpdatedIngredients = {
            ...this.state.ingredients
        }
        UpdatedIngredients[type] = UpdatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: UpdatedIngredients });
        this.updatePurchaseState(UpdatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        //If OldCount less than zero don't do nothing
        if (oldCount <= 0) {
            return;
        }
        const UpdatedCount = oldCount - 1;
        const UpdatedIngredients = {
            ...this.state.ingredients
        }
        UpdatedIngredients[type] = UpdatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: UpdatedIngredients });
        this.updatePurchaseState(UpdatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseHandlerCancel = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('You Continue!');
        // this.setState({ loading: true });

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Bruna Web Developer',
        //         address: {
        //             street: 'test street',
        //             zipCode: '70722',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // //Comment all this code axios to see the spinner all the time
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //Empty Array
        const queryParams = [];
        //create a loop
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };//This will bring {salad:true, meat:false, ...}

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasebr={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredientsorder={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseHandlerCancel}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        //After
        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);