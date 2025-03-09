import React from 'react';
import './login.css';
import {FaFacebook} from "react-icons/fa";

const Login = () => {
    return (
        <div className="container">
            <h2>Login</h2>
            <p>Please login with your Facebook account</p>
            <a href="/login/facebook" className="btn btn-facebook text-white" role="button">
                <div className="d-flex align-items-center">
                    <FaFacebook aria-hidden="true" className="mr-2"/>
                    <span>Sign in using Facebook</span>
                </div>
            </a>
        </div>
    );
};

export default Login;
