import React , { useEffect }from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WalletItem from './WalletItem';
import numeral from 'numeral';
import {fetchPrices, updateWalletItem, deleteWalletItem} from '../../actions';

export default ({ handleEditItem }) => {
  const prices = useSelector(state => state.currencies.prices);
  const items = useSelector(state => state.wallet.assets);

  // const editItem = values => updateWalletItem(values, 'add').then(() => $('#addCurrencyModal').modal('hide'));
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
    <table className="table table-responsive-md table-hover">
      <thead>
        <tr>
          <th scope="col" width="50">Currency</th>
          <th scope="col" width="150" className="text-right">Avg. Price</th>
          <th scope="col" width="150" className="text-right">Amount</th>
          <th scope="col" width="150" className="text-right">Total</th>
          <th scope="col" width="200" className="text-right">Last update</th>
          <th scope="col" className="text-right" width="50"></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td>Total:</td>
          <td colSpan="3"className="text-right">{numeral(totalValue).format('0,0.00')}</td>
          <td colSpan="2"></td>
        </tr>
      </tfoot>
      <tbody>
      {
        items.map( i => {
          const price = prices[i.currency] && prices[i.currency].EUR;
          return <WalletItem
                    key={i.id}
                    values={i}
                    price={price}
                    handleEditItem={handleEditItem}
                    handleDeleteItem={id => dispatch(deleteItem(id))}
                />
        })
      }
      </tbody>
    </table>
  )
}
