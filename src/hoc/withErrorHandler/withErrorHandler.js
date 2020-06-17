import React, { useState, useEffect } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHander = (WrappedComponent, axios) => {
    //Return Anonymous function, do not set up a name here because I never use that class
    return props => {
        const [error, setError] = useState(null);

        //on the request clean the error
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            //console.log(err);
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]); //this ensures that we clean this up whenever our interceptors change

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHander;