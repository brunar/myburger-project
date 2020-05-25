import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updatedObject } from '../../shared/utitily';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignUp: true
    }

    componentDidMount() {
        //if not equal true OR 
        if (!this.props.buildingBurger && this.props.authRedirectPathPP !== '/') {
            this.props.onSetAuthRedirectPath(); //Do not need to pass an Argument here because is alredy hardcode in mapDispatchToProps, And there is not passing by Argument
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            //.trim() is to remove any whitesspaces at the beginning or end
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid; //return true or false

    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls, {
            [controlName]: updatedObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation), // (value, root+validation)
                touched: true
            })
        })

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        // preventDefault() to prevent the reloading of the page
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))
        if (this.props.loadingg) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.errorPr) {
            errorMessage = (
                <p>{this.props.errorPr.message}</p> // .message is coming from firebase property and has to be a js object
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPathPP} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clickedBtn={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
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