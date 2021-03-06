import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        this.props.onFetchOrders(this.props.tokenPP, this.props.userIdPP);
    }

    render() {
        let ordersVa = <Spinner />;
        if (!this.props.loadingg) {
            ordersVa = (
                this.props.ordersAA.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    // toFixed() only works for number and props is a string 
                    // OR include + on price Example:
                    // price={+order.price}
                    />
                ))
            )
        }
        return (
            <div>
                {ordersVa}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ordersAA: state.orderSS.orders,
        loadingg: state.orderSS.loading,
        tokenPP: state.authSS.token,
        userIdPP: state.authSS.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (tokenArg, userIdA) => dispatch(actions.fetchOrders(tokenArg, userIdA))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));