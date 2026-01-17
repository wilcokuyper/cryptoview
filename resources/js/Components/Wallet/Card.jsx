import PropTypes from 'prop-types';
import { memo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import numeral from 'numeral';
import Animated from './Animated';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { FaEdit, FaTrash } from "react-icons/fa";
import useHistoricalData from '../../hooks/useHistoricalData';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const Card = ({ values, price, handleEditItem, handleDeleteItem }) => {
    const { id, currency, amount, updated_at } = values;
    const { data: historicalData, loading: historicalDataLoading } = useHistoricalData(currency);
    const totalValue = price * amount;
    const shouldReduceMotion = useReducedMotion();

    const confirmDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${currency}? This action cannot be undone.`)) {
            handleDeleteItem(id);
        }
    };

    return (
        <motion.div
            layout={!shouldReduceMotion}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 hover:shadow-md hover:border-gray-200 dark:hover:border-slate-600 transition-[shadow,border-color] duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">{currency.slice(0, 2)}</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{currency}</h3>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{numeral(amount).format('0,0.0000')} units</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
                    <button
                        type="button"
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors duration-150"
                        onClick={() => handleEditItem(values)}
                        aria-label={`Edit ${currency}`}
                    >
                        <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-danger hover:bg-danger/5 dark:hover:bg-danger/10 rounded-lg transition-colors duration-150"
                        onClick={confirmDelete}
                        aria-label={`Delete ${currency}`}
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="h-16 mb-4">
                {historicalDataLoading ? (
                    <div className="flex items-center justify-center h-full" role="status" aria-label={`Loading ${currency} price history`}>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-loading-1" />
                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-loading-2" />
                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-loading-3" />
                        </div>
                        <span className="sr-only">Loading price history</span>
                    </div>
                ) : (
                    <div aria-label={`${currency} price trend chart`} role="img">
                        <Sparklines data={historicalData} margin={6}>
                            <SparklinesLine
                                style={{ strokeWidth: 2, stroke: 'var(--color-primary)', fill: 'none' }}
                            />
                            <SparklinesSpots
                                size={2}
                                style={{ stroke: 'var(--color-primary)', strokeWidth: 2, fill: 'white' }}
                            />
                        </Sparklines>
                    </div>
                )}
            </div>

            <div className="flex items-end justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
                <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Current Price</p>
                    <Animated value={price}>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {numeral(price).format('0,0.00')}
                        </span>
                    </Animated>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Total Value</p>
                    <p className="text-lg font-bold text-primary">{numeral(totalValue).format('0,0.00')}</p>
                </div>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-right">
                Updated {formatDate(updated_at)}
            </p>
        </motion.div>
    );
};

Card.propTypes = {
    values: PropTypes.object,
    price: PropTypes.number,
    handleDeleteItem: PropTypes.func,
    handleEditItem: PropTypes.func
};

export default memo(Card);
