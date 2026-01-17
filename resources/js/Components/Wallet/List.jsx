import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'motion/react';
import numeral from 'numeral';
import Animated from './Animated';
import { FaEdit, FaTrash } from "react-icons/fa";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const List = ({ values, price, handleEditItem, handleDeleteItem, isEven }) => {
    const { id, currency, amount, updated_at } = values;
    const totalValue = price * amount;
    const shouldReduceMotion = useReducedMotion();

    const confirmDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${currency}? This action cannot be undone.`)) {
            handleDeleteItem(id);
        }
    };

    return (
        <motion.tr
            layout={!shouldReduceMotion}
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className={`group ${isEven ? 'bg-gray-50/50 dark:bg-slate-800/50' : ''} hover:bg-primary/5 dark:hover:bg-primary/10`}
        >
            <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-[10px] sm:text-xs">{currency.slice(0, 2)}</span>
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{currency}</span>
                </div>
            </td>
            <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                <Animated value={price}>
                    <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">{numeral(price).format('0,0.00')}</span>
                </Animated>
            </td>
            <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {numeral(amount).format('0,0.0000')}
            </td>
            <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                <span className="font-semibold text-xs sm:text-sm text-primary">{numeral(totalValue).format('0,0.00')}</span>
            </td>
            <td className="hidden md:table-cell px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-gray-500 dark:text-gray-400 text-sm">
                {formatDate(updated_at)}
            </td>
            <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
                    <button
                        type="button"
                        className="min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-150"
                        onClick={() => handleEditItem(values)}
                        aria-label={`Edit ${currency}`}
                    >
                        <FaEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                        type="button"
                        className="min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors duration-150"
                        onClick={confirmDelete}
                        aria-label={`Delete ${currency}`}
                    >
                        <FaTrash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                </div>
            </td>
        </motion.tr>
    );
};

List.propTypes = {
    values: PropTypes.object,
    price: PropTypes.number,
    handleDeleteItem: PropTypes.func,
    handleEditItem: PropTypes.func,
    isEven: PropTypes.bool
};

export default memo(List);
