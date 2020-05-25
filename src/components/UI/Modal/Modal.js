import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.show !== this.props.show) {
        //     return true;
        // }
        //Shortcut for the code above
        //Comparation if the nextProps is diferent from the old state 
        //or if the children has some update than to show loading spinner when modal move-out
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children

    }

    //componentDidUpdate() {
    //console.log('[Modal.js] DidUpdate')
    //}

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clickedback={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
};

export default Modal;