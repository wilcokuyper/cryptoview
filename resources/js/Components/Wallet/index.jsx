import PropTypes from 'prop-types';
import { useEffect, useMemo, useCallback } from 'react';
import numeral from 'numeral';
import useCurrencyStore from '../../stores/currencyStore';
import useWalletStore from '../../stores/walletStore';
import { calculateTotalValue } from '../../utils/priceUtils';
import { PRICE_REFRESH_INTERVAL } from '../../constants/intervals';
import CardView from './CardView';
import ListView from './ListView';

const Wallet = ({ handleAddItem, handleEditItem, list }) => {
    const prices = useCurrencyStore(state => state.prices);
    const fetchPrices = useCurrencyStore(state => state.fetchPrices);
    const assets = useWalletStore(state => state.assets);
    const deleteWalletItem = useWalletStore(state => state.deleteWalletItem);

    const handleDeleteItem = useCallback(id => deleteWalletItem(id), [deleteWalletItem]);

    useEffect(() => {
        const interval = setInterval(fetchPrices, PRICE_REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, [fetchPrices]);

    const totalValue = useMemo(
        () => calculateTotalValue(assets, prices),
        [assets, prices]
    );

    return list ? (
        <ListView
            items={assets}
            prices={prices}
            total={numeral(totalValue).format('0,0.00')}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}
        />
    ) : (
        <CardView
            items={assets}
            prices={prices}
            total={numeral(totalValue).format('0,0.00')}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}
        />
    );
};

Wallet.propTypes = {
    handleAddItem: PropTypes.func,
    handleEditItem: PropTypes.func,
    list: PropTypes.bool,
};

export default Wallet;
