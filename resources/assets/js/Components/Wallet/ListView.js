import PropTypes from 'prop-types';
import React from 'react';
import List from './List';
import {PlusIcon} from "@heroicons/react/solid";

const ListView = ({ onAddItem, onDeleteItem, onEditItem, items, prices, total }) => {
    return (
        <React.Fragment>
            <div className="mb-3">
                <button
                    className="bg-blue-400 hover:bg-blue-500 transition text-white text-sm rounded mr-auto flex items-center px-3 py-2"
                    onClick={onAddItem}
                ><PlusIcon className="h-5" /> Add</button>
            </div>
            <table className="table table-fixed w-full">
                <thead>
                    <tr className="border-t border-b-2 border-gray-100">
                        <th scope="col" className="w-1/12 text-left p-2">Currency</th>
                        <th scope="col" className="w-2/12 text-right p-2">Amount</th>
                        <th scope="col" className="w-3/12 text-right p-2">Avg. Price</th>
                        <th scope="col" className="w-3/12 text-right p-2">Total</th>
                        <th scope="col" className="w-2/12 text-right p-2">Last update</th>
                        <th scope="col" className="w-1/12 text-right p-2">&nbsp;</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr className="border-b border-gray-100">
                        <td className="p-2">Total:</td>
                        <td colSpan="3" className="text-right p-2">{total}</td>
                        <td colSpan="2" className="p-2">&nbsp;</td>
                    </tr>
                </tfoot>
                <tbody>
                    { items.map( item => {
                        const asset =  prices.filter(price => price.name === item.currency);
                        const price = asset.length > 0 ? asset[0].prices.EUR : 0;
                        return <List
                            key={item.id}
                            values={item}
                            price={price}
                            handleEditItem={onEditItem}
                            handleDeleteItem={onDeleteItem}
                        />;
                    })
                    }
                </tbody>
            </table>
        </React.Fragment>
    );
};

ListView.propTypes = {
    onAddItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    items: PropTypes.array,
    prices: PropTypes.array,
    total: PropTypes.string,
};

export default ListView;
