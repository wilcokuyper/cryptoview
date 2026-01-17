import { useState, useEffect } from 'react';
import api from '../services/api';
import { HISTORICAL_DATA_INTERVAL } from '../constants/intervals';

/**
 * Custom hook for fetching and polling historical price data
 * @param {string} currency - The currency to fetch historical data for
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 */
const useHistoricalData = (currency) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await api.history(currency);
                if (isMounted) {
                    setData(res.data);
                    setLoading(false);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        const interval = setInterval(fetchData, HISTORICAL_DATA_INTERVAL);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [currency]);

    return { data, loading, error };
};

export default useHistoricalData;
