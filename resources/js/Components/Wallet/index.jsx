import PropTypes from 'prop-types';
import React , { useEffect }from 'react';
import {useDispatch, useSelector} from 'react-redux';
import numeral from 'numeral';
import {fetchPrices, deleteWalletItem} from '../../actions';
import CardView from './CardView';
import ListView from './ListView';

const Wallet = ({ handleAddItem, handleEditItem, list }) => {
    const prices = useSelector(state => state.currencies.prices);
    const items = useSelector(state => state.wallet.assets);

    const dispatch = useDispatch();

    const deleteItem = id => dispatch(deleteWalletItem(id));

    const handeDeleteItem = id => deleteItem(id);

    useEffect(() => {
        const interval = setInterval(() => dispatch(fetchPrices()), 10000);

        return () => clearInterval(interval);
    }, []);

    const totalValue = items.reduce((sum, item) => {
        const asset = prices.filter(price => price.name === item.currency);
        return asset.length !== 0 ? sum += item.amount * asset[0].prices.EUR : 0;
    }, 0);

    return (
        <React.Fragment>
            { list
                ? <ListView
                    items={items}
                    prices={prices}
                    total={numeral(totalValue).format('0,0.00')}
                    onAddItem={handleAddItem}
                    onDeleteItem={handeDeleteItem}
                    onEditItem={handleEditItem}
                />
                : <CardView
                    items={items}
                    prices={prices}
                    total={numeral(totalValue).format('0,0.00')}
                    onAddItem={handleAddItem}
                    onDeleteItem={handeDeleteItem}
                    onEditItem={handleEditItem}
                /> }
        </React.Fragment>    
    );
};

Wallet.propTypes = {
    handleAddItem: PropTypes.func,
    handleEditItem: PropTypes.func,
    list: PropTypes.bool,
};

export default Wallet;