import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    useEffect(() => {
        props.onFetchOrders(props.tokenPP, props.userIdPP);
    }, [])


    let ordersVa = <Spinner />;
    if (!props.loadingg) {
        ordersVa = (
            props.ordersAA.map(order => (
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