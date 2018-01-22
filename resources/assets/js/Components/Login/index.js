import React, { Component } from 'react';
import './login.css';

export default () => {
  return (
    <div className="container">
      <h2>Login</h2>
      <p>Please login with your Facebook account</p>
      <a href="/login/facebook" className="btn btn-facebook text-white" role="button"><i className="fa fa-facebook-official" aria-hidden="true"/> Sign in using Facebook</a>
    </div>
  )
}
