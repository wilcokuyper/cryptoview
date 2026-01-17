import PropTypes from 'prop-types';
import { AnimatePresence } from 'motion/react';
import List from './List';
import { FaPlus } from "react-icons/fa";
import { getPriceForCurrency } from '../../utils/priceUtils';

const ListView = ({ onAddItem, onDeleteItem, onEditItem, items, prices, total }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total Portfolio Value</span>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-11 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover shadow-sm transition-colors duration-150"
                    onClick={onAddItem}
                >
                    <FaPlus className="w-4 h-4" />
                    <span>Add Asset</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50/80 dark:bg-slate-700/50">
                                <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Asset
                                </th>
                                <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Holdings
                                </th>
                                <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Value
                                </th>
                                <th scope="col" className="hidden md:table-cell px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Updated
                                </th>
                                <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 w-12 sm:w-20">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                            <AnimatePresence mode="popLayout">
                                {items.map((item, index) => (
                                    <List
                                        key={item.id}
                                        values={item}
                                        price={getPriceForCurrency(item.currency, prices)}
                                        handleEditItem={onEditItem}
                                        handleDeleteItem={onDeleteItem}
                                        isEven={index % 2 === 1}
                                    />
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {items.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaPlus className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No assets yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Add your first cryptocurrency to start tracking</p>
                        <button
                            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-11 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors duration-150"
                            onClick={onAddItem}
                        >
                            <FaPlus className="w-4 h-4" />
                            Add your first asset
                        </button>
                    </div>
                )}
            </div>
        </div>
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
