import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {LoginIcon, LogoutIcon} from "@heroicons/react/outline";

const Header = () => {
    const auth = useSelector(state => state.auth);

    const renderAuthContent = auth => {
        switch (auth.isAuthenticated) {
            case null:
                return;

            case false:
                return (
                    <a href="/login/facebook" title="Login">
                        <LoginIcon className="h-5"/>
                    </a>
                );

            default:
                return (
                    <>
                        <div>
                            <img src={auth.user.avatar} className="h-8 w-8 rounded-full flex-1"/>
                        </div>
                        <div className="mx-3">{auth.user.name}</div>
                        <a href="/logout" className="hover:text-gray-200" title="Logout">
                            <LogoutIcon className="h-5" />
                        </a>
                    </>
                );
        }
    };

    return (
        <nav className="bg-blue-800 mb-5 text-white">
            <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify between h-16">
                    <Link className="text-lg md:text-xl" to="/">Cryptoview</Link>
                    <div className="flex items-center ml-auto">
                        {renderAuthContent(auth)}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
