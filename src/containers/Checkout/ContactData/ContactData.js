import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { updatedObject, checkValidity } from '../../../shared/utitily';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }

    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        //prevent default do not send a resquest submit to the form when loaded or reload the page
        event.preventDefault();
        //console.log(props.ingredients);

        const formData = {}; //Empty object
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }

        const orderG = {
            ingredients: props.ings,
            price: props.pprice,
            orderData: formData,
            userId: props.userIdPP
        }
        props.onOrderBurger(orderG, props.tokenPP);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);

        const updatedFormElement = updatedObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updatedObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        //console.log(formIsValid);

        //console.log(updatedFormElement);
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid); //even true or false
    }


    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touchedbr={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" disabledBr={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loadingg) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );

}

const mapStateToProps = state => {
    // burgerBuilderSS and orderSS was declared at combineReducers on Index.js/App
    return {
        ings: state.burgerBuilderSS.ingredients,
        pprice: state.burgerBuilderSS.totalPrice,
        loadingg: state.orderSS.loading,
        tokenPP: state.authSS.token,
        userIdPP: state.authSS.userId
    }
}

const mapDispatchToProps = dispatchX => {
    return {
        onOrderBurger: (orderDataArgC, tokenC) => dispatchX(actions.purchaseBurger(orderDataArgC, tokenC))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));