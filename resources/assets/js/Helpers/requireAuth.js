import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ComposedComponent) => {

  class AuthComponent extends Component {
    render() {
      if (this.props.isAuthenticating) {
        return <div className="container">Logging in...</div>
      } else {
        if (this.props.isAuthenticated) {
          return <ComposedComponent {...this.props} />
        } else {
          return <Redirect to={{
            pathname: '/login',
            state: { from: this.props.location }
          }} />
        }
      }
    }
  }

  const mapStateToProps = state => ({
    isAuthenticating: state.auth.isAuthenticating,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(AuthComponent);
}
