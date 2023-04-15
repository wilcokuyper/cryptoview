import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const useAuth = (ComposedComponent) => {
  const isAuthenticating = useSelector((state) => state.auth.isAuthenticating)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return function (props) {
    if (isAuthenticating) {
      return <div className="container">Logging in...</div>
    }
    if (isAuthenticated) {
      return <ComposedComponent {...props} />
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    )
  }
}

export default useAuth
