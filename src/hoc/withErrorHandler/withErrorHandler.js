import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHander = (WrappedComponent, axios) => {
    //Return Anonymous class-based Component,  do not set up a name here because I never use that class
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            //on the request clean the error
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, errorObj => {
                //console.log(errorObj);
                this.setState({ error: errorObj });
            });
        }
        //to prevent memory should remove the Interceptors
        componentWillUnmount() {
            //console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHander;