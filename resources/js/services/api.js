import axios from 'axios';
import { HISTORICAL_DATA_COUNT } from '../constants/intervals';

/**
 * Centralized API service layer
 */
export const api = {
    // Auth endpoints
    user: () => axios.get('/api/user'),

    // Currency endpoints
    currencies: () => axios.get('/api/currencies'),
    prices: () => axios.get('/api/prices'),
    history: (currency, count = HISTORICAL_DATA_COUNT) =>
        axios.get(`/api/history?currency=${currency}&count=${count}`),

    // Wallet endpoints
    wallet: {
        get: () => axios.get('/api/wallet'),
        create: (data) => axios.post('/api/wallet', data),
        delete: (id) => axios.delete(`/api/wallet/${id}`),
    },
};

export default api;
