import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updatedObject, checkValidity } from '../../shared/utitily';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPathPP !== '/') {
            props.onSetAuthRedirectPath(); //Do not need to pass an Argument here because is alredy hardcode in mapDispatchToProps, And there is not passing by Argument
        }
    }, []);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(authForm, {
            [controlName]: updatedObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation), // (value, root+validation)
                touched: true
            })
        })
        setAuthForm(updatedControls);
    }

    const submitHandler = (event) => {
        // preventDefault() to prevent the reloading of the page
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp); //toggle
        // this.setState(prevState => {
        //     return { isSignUp: !prevState.isSignUp }
        // })
    }


    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }
    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touchedbr={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ))
    if (props.loadingg) {
        form = <Spinner />
    }
    let errorMessage = null;
    if (props.errorPr) {
        errorMessage = (
            <p>{props.errorPr.message}</p> // .message is coming from firebase property and has to be a js object
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPathPP} />
    }

    return (
        <div className={classes.Auth}>
            <h1>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                clickedBtn={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loadingg: state.authSS.loading,
        errorPr: state.authSS.error,
        isAuthenticated: state.authSS.token !== null,
        buildingBurger: state.burgerBuilderSS.building,
        authRedirectPathPP: state.authSS.authRedirectPath

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUpA) => dispatch(actions.auth(email, password, isSignUpA)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);