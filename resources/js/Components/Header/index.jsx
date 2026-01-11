import { Link } from '@tanstack/react-router';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import useAuthStore from '../../stores/authStore';

const Header = () => {
    const { isAuthenticated, user } = useAuthStore();

    const renderAuthContent = () => {
        if (isAuthenticated === null) {
            return null;
        }

        if (!isAuthenticated) {
            return (
                <a href="/login/facebook" className="text-white hover:text-gray-200 px-3 py-2">
                    Login
                </a>
            );
        }

        return (
            <Menu as="div" className="relative">
                <MenuButton className="flex items-center text-white hover:text-gray-200 px-3 py-2">
                    <img
                        src={user.avatar}
                        className="rounded-full mr-3 h-9 w-9"
                        alt={`${user.name}'s avatar`}
                    />
                    {user.name}
                    <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    href="/logout"
                                    className={`block px-4 py-2 text-sm ${
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    }`}
                                >
                                    Logout
                                </a>
                            )}
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        );
    };

    return (
        <nav className="bg-brand-cyan shadow-sm mb-5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link className="text-white text-xl font-bold" to="/">
                        Cryptoview
                    </Link>
                    <div className="flex items-center">
                        {renderAuthContent()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
