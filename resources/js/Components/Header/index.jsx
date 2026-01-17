import { Link } from '@tanstack/react-router';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import useAuthStore from '../../stores/authStore';
import { FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from '../ThemeToggle';

const Header = () => {
    const { isAuthenticated, user } = useAuthStore();

    const renderAuthContent = () => {
        if (isAuthenticated === null) {
            return null;
        }

        if (!isAuthenticated) {
            return (
                <a
                    href="/login/facebook"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium px-4 py-2 rounded-lg hover:bg-primary-light dark:hover:bg-slate-800 transition-colors duration-150"
                >
                    Login
                </a>
            );
        }

        return (
            <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{user.name}</span>
                    <img
                        src={user.avatar}
                        className="rounded-full h-9 w-9 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-150"
                        alt={`${user.name}'s avatar`}
                    />
                    <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-150"
                    enterFrom="transform opacity-0 scale-95 -translate-y-1"
                    enterTo="transform opacity-100 scale-100 translate-y-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform opacity-100 scale-100 translate-y-0"
                    leaveTo="transform opacity-0 scale-95 -translate-y-1"
                >
                    <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-slate-700 focus:outline-none z-50 py-1 overflow-hidden">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    href="/logout"
                                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors duration-100 ${
                                        active ? 'bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-300'
                                    }`}
                                >
                                    <FaSignOutAlt className="text-gray-400 dark:text-gray-500" />
                                    Sign out
                                </a>
                            )}
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        );
    };

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    <Link className="flex items-center gap-2" to="/">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Cryptoview</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary rounded-xl">
                            <ThemeToggle />
                        </div>
                        {renderAuthContent()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
