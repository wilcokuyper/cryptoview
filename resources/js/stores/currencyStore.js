import { create } from 'zustand';
import api from '../services/api';

const useCurrencyStore = create((set) => ({
    types: [],
    prices: [],
    isLoading: false,
    error: null,

    fetchCurrencies: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.currencies();
            set({ types: res.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchPrices: async () => {
        set({ error: null });
        try {
            const res = await api.prices();
            set({ prices: res.data });
        } catch (error) {
            set({ error: error.message });
        }
    },
}));

export default useCurrencyStore;
