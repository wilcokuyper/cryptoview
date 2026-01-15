import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
    isAuthenticating: true,
    isAuthenticated: null,
    user: null,

    fetchUser: async () => {
        set({ isAuthenticating: true });
        try {
            const res = await api.user();
            if (res.data !== null) {
                set({ isAuthenticating: false, isAuthenticated: true, user: res.data });
            } else {
                set({ isAuthenticating: false, isAuthenticated: false, user: null });
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            set({ isAuthenticating: false, isAuthenticated: false, user: null });
        }
    },
}));

export default useAuthStore;
