import { useEffect } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '../../router';
import useAuthStore from '../../stores/authStore';
import useCurrencyStore from '../../stores/currencyStore';
import useWalletStore from '../../stores/walletStore';

const App = () => {
    const fetchUser = useAuthStore(state => state.fetchUser);
    const fetchCurrencies = useCurrencyStore(state => state.fetchCurrencies);
    const fetchPrices = useCurrencyStore(state => state.fetchPrices);
    const fetchWallet = useWalletStore(state => state.fetchWallet);

    useEffect(() => {
        fetchUser();
        fetchCurrencies();
        fetchWallet();
        fetchPrices();
    }, [fetchUser, fetchCurrencies, fetchWallet, fetchPrices]);

    return <RouterProvider router={router} />;
};

export default App;
