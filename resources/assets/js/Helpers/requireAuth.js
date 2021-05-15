import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const requireAuth = (ComposedComponent) => {
    const isAuthenticating = useSelector(state => state.auth.isAuthenticating);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return function (props) {
        if (isAuthenticating) {
            return <div className="container mx-auto">Logging in...</div>;
        } else {
            if (isAuthenticated) {
                return <ComposedComponent {...props} />;
            } else {
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />;
            }
        }
    };
};

export default requireAuth;
