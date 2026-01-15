import { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import Animated from './Animated';
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ values, price, handleEditItem, handleDeleteItem }) => {
    const { id, currency, amount, updated_at } = values;

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-3 whitespace-nowrap">{currency}</td>
            <td className="px-4 py-3 whitespace-nowrap text-right">
                <Animated value={price}>
                    {numeral(price).format('0,0.00')}
                </Animated>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right">{numeral(amount).format('0,0.0000')}</td>
            <td className="px-4 py-3 whitespace-nowrap text-right">{numeral(price * amount).format('0,0.00')}</td>
            <td className="px-4 py-3 whitespace-nowrap text-right">{moment(updated_at).format('D-M-Y')}</td>
            <td className="px-4 py-3 whitespace-nowrap text-right">
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
            </td>
        </tr>
    );
};

List.propTypes = {
    values: PropTypes.object,
    price: PropTypes.number,
    handleDeleteItem: PropTypes.func,
    handleEditItem: PropTypes.func
};

export default memo(List);
