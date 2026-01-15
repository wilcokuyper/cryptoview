import PropTypes from 'prop-types';
import List from './List';
import { FaPlus } from "react-icons/fa";
import { getPriceForCurrency } from '../../utils/priceUtils';

const ListView = ({ onAddItem, onDeleteItem, onEditItem, items, prices, total }) => {
    return (
        <>
            <div className="mb-3">
                <button
                    className="inline-flex items-center px-4 py-2 bg-brand-blue text-white font-medium rounded-md hover:bg-brand-blue/90"
                    onClick={onAddItem}
                >
                    <FaPlus aria-hidden="true" className="mr-1" /> Add
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                Currency
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                                Avg. Price
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                                Amount
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                                Total
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                                Last update
                            </th>
                            <th scope="col" className="px-4 py-3 text-right w-12">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tfoot className="bg-gray-50">
                        <tr>
                            <td className="px-4 py-3 font-medium">Total:</td>
                            <td colSpan="3" className="px-4 py-3 text-right font-semibold">{total}</td>
                            <td colSpan="2"></td>
                        </tr>
                    </tfoot>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map(item => (
                            <List
                                key={item.id}
                                values={item}
                                price={getPriceForCurrency(item.currency, prices)}
                                handleEditItem={onEditItem}
                                handleDeleteItem={onDeleteItem}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
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
