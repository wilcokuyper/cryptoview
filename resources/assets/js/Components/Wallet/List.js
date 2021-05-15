import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Animated from './Animated';
import {PencilAltIcon, TrashIcon} from "@heroicons/react/outline";

const List = ({ values, price, handleEditItem, handleDeleteItem }) => {

    const { id, currency, amount, updated_at } = values;

    return (
        <tr className="border-b border-gray-100 transition hover:bg-gray-50">
            <td className="py-3 px-2">{currency}</td>
            <td className="text-right py-3 px-2">{numeral(amount).format('0,0.0000')}</td>
            <td className="text-right py-3 px-2">
                <Animated value={price}>
                    {numeral(price).format('0,0.00')}
                </Animated>
            </td>
            <td className="text-right py-3 px-2">{numeral(price * amount).format('0,0.00')}</td>
            <td className="text-right py-3 px-2">{moment(updated_at).format('D-M-Y')}</td>
            <td className="text-right py-3 px-2">
                <div className="btn-group btn-group-sm" role="group" aria-label="Edit currency {currency}">
                    <button
                        type="button"
                        className="px-3 py-2 rounded-l-lg transition hover:bg-gray-200"
                        onClick={() => handleEditItem(values)}
                    ><PencilAltIcon className="h-5" /></button>
                    <button
                        type="button"
                        className="px-3 py-2 rounded-r-lg transition hover:bg-gray-200"
                        onClick={() => handleDeleteItem(id)}
                    >
                        <TrashIcon className="h-5" />
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

export default List;
