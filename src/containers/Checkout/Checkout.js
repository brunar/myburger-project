import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                {/* If your render the component manually in Route you can pass props into the component */}
                <Route path={this.props.match.path + '/contact-data'}
                    //render={(props) => (<ContactData ingredients={this.props.ings} price={this.state.totalPrice} {...props} />)} 
                    component={ContactData}
                />
            </div>
        );
    }
}
const mapStatetoProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStatetoProps)(Checkout);
// If you have only mapDispatchToProps, it is a 2nd argument always then write as example bellow
// export default connect(null, mapDispatchToProps)(Checkout);
