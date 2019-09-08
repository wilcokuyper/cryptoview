import PropTypes from 'prop-types';
import React , { useEffect }from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WalletItem from './WalletItem';
import numeral from 'numeral';
import {fetchPrices, deleteWalletItem} from '../../actions';

const Wallet = ({ handleAddItem, handleEditItem }) => {
    const prices = useSelector(state => state.currencies.prices);
    const items = useSelector(state => state.wallet.assets);

    const deleteItem = id => deleteWalletItem(id);

    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => dispatch(fetchPrices()), 10000);

        return () => clearInterval(interval);
    }, []);

    const totalValue = items.reduce((sum, item) => {
        const price = prices[item.currency] && prices[item.currency].EUR;
        return sum += item.amount * price;
    }, 0);

    return (
        <React.Fragment>
            <div className="d-flex p-2 mb-2 bg-secondary">
                <div className="flex-grow-1">
                    <span className="text-white align-middle"><strong>Total:</strong> {numeral(totalValue).format('0,0.00')}</span>
                </div>
                <div className="btn-group btn-group-sm" role="group" aria-label="wallet actions">
                    <button className="btn btn-light ml-auto" onClick={handleAddItem}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div className="row">      
                {
                    items.map( i => {
                        const price = prices[i.currency] && prices[i.currency].EUR;
                        return <WalletItem
                            key={i.id}
                            values={i}
                            price={price}
                            handleEditItem={handleEditItem}
                            handleDeleteItem={id => dispatch(deleteItem(id))}
                        />;
                    })
                }
            </div>
        </React.Fragment>    
    );
};

Wallet.propTypes = {
    handleAddItem: PropTypes.func,
    handleEditItem: PropTypes.func
};

export default Wallet;