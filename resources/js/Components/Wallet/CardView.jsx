import PropTypes from 'prop-types';
import { AnimatePresence } from 'motion/react';
import Card from './Card';
import { FaPlus } from "react-icons/fa";
import { getPriceForCurrency } from '../../utils/priceUtils';

const CardView = ({ onAddItem, onDeleteItem, onEditItem, items, prices, total }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">Total Portfolio Value</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
                </div>
                <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-primary text-white font-medium rounded-xl hover:bg-primary-hover shadow-sm transition-colors duration-150"
                    onClick={onAddItem}
                >
                    <FaPlus className="w-4 h-4" />
                    <span>Add Asset</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {items.map(item => (
                        <Card
                            key={item.id}
                            values={item}
                            price={getPriceForCurrency(item.currency, prices)}
                            handleEditItem={onEditItem}
                            handleDeleteItem={onDeleteItem}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaPlus className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No assets yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Add your first cryptocurrency to start tracking</p>
                    <button
                        className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors duration-150"
                        onClick={onAddItem}
                    >
                        <FaPlus className="w-4 h-4" />
                        Add your first asset
                    </button>
                </div>
            )}
        </div>
    );
};

CardView.propTypes = {
    onAddItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    items: PropTypes.array,
    prices: PropTypes.array,
    total: PropTypes.string,
};

export default CardView;
