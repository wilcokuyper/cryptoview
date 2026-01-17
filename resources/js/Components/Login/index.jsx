import { FaFacebook } from "react-icons/fa";

const Login = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="px-8 pt-8 pb-6 text-center">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Cryptoview</h1>
                        <p className="text-gray-500 dark:text-gray-400">Track your cryptocurrency portfolio with ease</p>
                    </div>

                    <div className="px-8 pb-8">
                        <a
                            href="/login/facebook"
                            className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-facebook text-white font-medium rounded-xl hover:bg-facebook/90 shadow-sm transition-colors duration-150"
                            role="button"
                        >
                            <FaFacebook className="w-5 h-5" aria-hidden="true" />
                            <span>Continue with Facebook</span>
                        </a>
                    </div>

                    <div className="px-8 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                            By continuing, you agree to our Terms of Service
                        </p>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
                    Secure login powered by Facebook OAuth
                </p>
            </div>
        </div>
    );
};

export default Login;
