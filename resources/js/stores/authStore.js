import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
    isAuthenticating: true,
    isAuthenticated: null,
    user: null,

    fetchUser: async () => {
        set({ isAuthenticating: true });
        try {
            const res = await axios.get('/api/user');
            if (res.data !== null) {
                set({ isAuthenticating: false, isAuthenticated: true, user: res.data });
            } else {
                set({ isAuthenticating: false, isAuthenticated: false, user: null });
            }
        } catch {
            set({ isAuthenticating: false, isAuthenticated: false, user: null });
        }
    },
}));

export default useAuthStore;
