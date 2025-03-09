import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Animated from './Animated';

const List = ({ values, price, handleEditItem, handleDeleteItem }) => {

    const { id, currency, amount, updated_at } = values;
  
    return (
        <tr>
            <td>{currency}</td>
            <td className="text-right">
                <Animated value={price}>
                    {numeral(price).format('0,0.00')}
                </Animated>
            </td>
            <td className="text-right">{numeral(amount).format('0,0.0000')}</td>
            <td className="text-right">{numeral(price * amount).format('0,0.00')}</td>
            <td className="text-right">{moment(updated_at).format('D-M-Y')}</td>
            <td className="text-right">
                <div className="btn-group btn-group-sm" role="group" aria-label="Edit currency {currency}">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleEditItem(values)}
                    >
                        <i className="fa fa-edit" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleDeleteItem(id)}
                    >
                        <i className="fa fa-trash" aria-hidden="true" />
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