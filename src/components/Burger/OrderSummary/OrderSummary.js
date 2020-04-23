import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functional component, does not have to be a class and do not need this lifecycle method 
    //It was only for debbug and improve performance
    componentDidUpdate() {
        console.log('[OrderSummary.js] DidUpdate')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredientsorder)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}:</span> {this.props.ingredientsorder[igKey]}
                    </li>
                );
            });

        return (
            <Aux>
                <h1>Your Order</h1>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>

                <Button clickedBtn={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clickedBtn={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Aux>
        );
    };
}

export default OrderSummary;