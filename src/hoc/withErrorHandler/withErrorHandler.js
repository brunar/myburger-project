import React from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHander = (WrappedComponent, axios) => {
    //Return Anonymous function, do not set up a name here because I never use that class
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios); // can be many objects not like useState, in this case has a function and state
        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHander;