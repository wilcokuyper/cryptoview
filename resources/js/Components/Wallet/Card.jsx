import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Animated from './Animated';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { FaEdit, FaTrash } from "react-icons/fa";

const Card = ({ values, price, handleEditItem, handleDeleteItem }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [historicalDataLoading, setHistoricalDataLoading] = useState(true);
    const { id, currency, amount, updated_at } = values;

    useEffect(() => {
        async function getHistoricalData(currency) {
            const res = await axios.get(`api/history?currency=${currency}&count=30`);
            setHistoricalData(res.data);
            setHistoricalDataLoading(false);
        }

        getHistoricalData(currency);

        const interval = setInterval(() => getHistoricalData(currency), 60000);

        return () => clearInterval(interval);
    }, [currency]);

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-2">
                <div className="flex mb-1">
                    <h3 className="flex-1 text-xl font-semibold">{currency}</h3>
                    <div>
                        <div className="inline-flex rounded-md shadow-sm" role="group" aria-label={`Edit currency ${currency}`}>
                            <button
                                type="button"
                                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-l-md hover:bg-gray-200"
                                onClick={() => handleEditItem(values)}
                            >
                                <FaEdit aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-r-md hover:bg-gray-200"
                                onClick={() => handleDeleteItem(id)}
                            >
                                <FaTrash aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 min-h-[60px]">
                        {historicalDataLoading ? (
                            <div className="inline-block relative w-14 h-full ml-[calc(50%-24px)]">
                                <div className="absolute top-[calc(50%-4px)] left-2 w-2 h-2 rounded-full bg-gray-500 animate-loading-1" />
                                <div className="absolute top-[calc(50%-4px)] left-2 w-2 h-2 rounded-full bg-gray-500 animate-loading-2" />
                                <div className="absolute top-[calc(50%-4px)] left-6 w-2 h-2 rounded-full bg-gray-500 animate-loading-2" />
                                <div className="absolute top-[calc(50%-4px)] left-10 w-2 h-2 rounded-full bg-gray-500 animate-loading-3" />
                            </div>
                        ) : (
                            <Sparklines data={historicalData} margin={20}>
                                <SparklinesLine
                                    style={{ strokeWidth: 2, stroke: '#336aff', fill: 'none' }}
                                />
                                <SparklinesSpots
                                    size={3}
                                    style={{ stroke: '#336aff', strokeWidth: 2, fill: 'white' }}
                                />
                            </Sparklines>
                        )}
                    </div>
                    <div className="w-[120px] pl-2.5 border-l border-gray-300">
                        <h5 className="text-right text-lg">
                            <Animated value={price}>
                                <strong>{numeral(price).format('0,0.00')}</strong>
                            </Animated>
                        </h5>
                        <div className="text-right">{numeral(amount).format('0,0.0000')}</div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="text-left text-gray-500 text-sm">{moment(updated_at).format('D-M-Y')}</div>
                    <div className="text-right"><em>{numeral(price * amount).format('0,0.00')}</em></div>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    values: PropTypes.object,
    price: PropTypes.number,
    handleDeleteItem: PropTypes.func,
    handleEditItem: PropTypes.func
};

export default Card;
