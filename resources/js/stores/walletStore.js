import { create } from 'zustand';
import axios from 'axios';

const useWalletStore = create((set) => ({
    assets: [],
    selectedAsset: null,
    isLoading: false,
    error: null,

    fetchWallet: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.get('/api/wallet');
            set({ assets: res.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateWalletItem: async (values, update = false) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post('/api/wallet', { ...values, update });
            set({ assets: res.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    deleteWalletItem: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.delete(`/api/wallet/${id}`);
            set({ assets: res.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    setSelectedAsset: (asset) => {
        set({ selectedAsset: asset });
    },

    clearSelectedAsset: () => {
        set({ selectedAsset: null });
    },
}));

export default useWalletStore;
