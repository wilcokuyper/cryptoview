import PropTypes from 'prop-types';
import { useEffect } from 'react';
import numeral from 'numeral';
import useCurrencyStore from '../../stores/currencyStore';
import useWalletStore from '../../stores/walletStore';
import CardView from './CardView';
import ListView from './ListView';

const Wallet = ({ handleAddItem, handleEditItem, list }) => {
    const prices = useCurrencyStore(state => state.prices);
    const fetchPrices = useCurrencyStore(state => state.fetchPrices);
    const assets = useWalletStore(state => state.assets);
    const deleteWalletItem = useWalletStore(state => state.deleteWalletItem);

    const handleDeleteItem = id => deleteWalletItem(id);

    useEffect(() => {
        const interval = setInterval(() => fetchPrices(), 10000);

        return () => clearInterval(interval);
    }, [fetchPrices]);

    const totalValue = assets.reduce((sum, item) => {
        const asset = prices.filter(price => price.name === item.currency);
        return asset.length !== 0 ? sum += item.amount * asset[0].prices.EUR : 0;
    }, 0);

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
