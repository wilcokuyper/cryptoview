import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Animated from './Animated';

export default ({ values, price, handleEditItem, handleDeleteItem }) => {

  const { id, currency, amount, updated_at } = values;
  
  return (
    <div className="col-12 col-md-6 col-lg-4">
    <div className="card mb-2 p-2">
      <div className="d-flex mb-1">
        <h3 className="flex-grow-1">{currency}</h3>
        <div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Edit currency {currency}">
            <button type="button" className="btn btn-light" onClick={() => handleEditItem(values)}><i className="fa fa-edit" aria-hidden="true" /></button>
            <button type="button" className="btn btn-light" onClick={() => handleDeleteItem(id)}><i className="fa fa-trash" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <h5 className="text-right">
        <Animated value={price}>
          {numeral(price).format('0,0.00')}
        </Animated>
      </h5>
      <div className="text-right">{numeral(amount).format('0,0.0000')}</div>
      <div className="d-flex justify-content-between">
        <div className="text-left">{moment(updated_at).format('D-M-Y')}</div>
        <div className="text-right">{numeral(price * amount).format('0,0.00')}</div>
      </div>
    </div>
    </div>
  )
}
