import { useEffect } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '../../router';
import useAuthStore from '../../stores/authStore';
import useCurrencyStore from '../../stores/currencyStore';
import useWalletStore from '../../stores/walletStore';

const App = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const fetchUser = useAuthStore(state => state.fetchUser);
    const fetchCurrencies = useCurrencyStore(state => state.fetchCurrencies);
    const fetchPrices = useCurrencyStore(state => state.fetchPrices);
    const fetchWallet = useWalletStore(state => state.fetchWallet);

    // Fetch auth state and public data on mount
    useEffect(() => {
        fetchUser();
        fetchCurrencies();
    }, [fetchUser, fetchCurrencies]);

    // Fetch protected data only after authentication is confirmed
    useEffect(() => {
        if (isAuthenticated) {
            fetchWallet();
            fetchPrices();
        }
    }, [isAuthenticated, fetchWallet, fetchPrices]);

    return <RouterProvider router={router} />;
};

export default App;
