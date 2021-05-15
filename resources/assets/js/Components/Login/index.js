import React from 'react';

const Login = () => {
    return (
        <div className="container mx-auto space-y-2">
            <h2 className="text-2xl">Login</h2>
            <p>Please login with your Facebook account</p>
            <a href="/login/facebook"
               className="inline-block px-4 py-2 bg-blue-800 rounded text-white"
               role="button"
            >Sign in using Facebook</a>
        </div>
    );
};

export default Login;
