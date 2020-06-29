import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    //This could be a functional component, does not have to be a class and do not need this lifecycle method 
    //It was only for debbug and improve performance
    // componentDidUpdate() {
    //     console.log('[OrderSummary.js] DidUpdate')
    // }

    const ingredientSummary = Object.keys(props.ingredientsorder)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}:</span> {props.ingredientsorder[igKey]}
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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>

            <Button clickedBtn={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clickedBtn={props.purchaseContinued} btnType="Success">CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary;