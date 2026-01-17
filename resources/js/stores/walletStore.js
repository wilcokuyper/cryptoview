import { create } from 'zustand';
import api from '../services/api';

const useWalletStore = create((set) => ({
    assets: [],
    selectedAsset: null,
    isLoading: false,
    error: null,

    fetchWallet: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.wallet.get();
            set({ assets: res.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateWalletItem: async (values, update = false) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.wallet.create({ ...values, update });
            set({ assets: res.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    deleteWalletItem: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.wallet.delete(id);
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
