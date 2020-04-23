import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
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

export default orderSummary;