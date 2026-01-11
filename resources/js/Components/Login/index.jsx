import { FaFacebook } from "react-icons/fa";

const Login = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Login</h2>
            <p className="text-gray-600 mb-4">Please login with your Facebook account</p>
            <a
                href="/login/facebook"
                className="inline-flex items-center px-4 py-2 bg-facebook text-white font-medium rounded-md hover:bg-facebook/90"
                role="button"
            >
                <FaFacebook aria-hidden="true" className="mr-2" />
                <span>Sign in using Facebook</span>
            </a>
        </div>
    );
};

export default Login;
