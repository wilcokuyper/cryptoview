import React from 'react';
import './login.css';
import {FaFacebook} from "react-icons/fa";

const Login = () => {
    return (
        <div className="container">
            <h2>Login</h2>
            <p>Please login with your Facebook account</p>
            <a href="/login/facebook" className="btn btn-facebook text-white" role="button"><FaFacebook aria-hidden="true"/> Sign in using Facebook</a>
        </div>
    );
};

export default Login;
