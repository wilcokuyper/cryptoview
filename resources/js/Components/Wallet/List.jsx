import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import Animated from './Animated'

function List({ values, price, handleEditItem, handleDeleteItem }) {
  const { id, currency, amount, updated_at } = values

  return (
    <tr>
      <td>{currency}</td>
      <td className="text-right">
        <Animated value={price}>{numeral(price).format('0,0.00')}</Animated>
      </td>
      <td className="text-right">{numeral(amount).format('0,0.0000')}</td>
      <td className="text-right">{numeral(price * amount).format('0,0.00')}</td>
      <td className="text-right">{moment(updated_at).format('D-M-Y')}</td>
      <td className="text-right">
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Edit currency {currency}"
        >
          <button
            type="button"
            className="btn btn-light"
            onClick={() => handleEditItem(values)}
          >
            <PencilIcon style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => handleDeleteItem(id)}
          >
            <TrashIcon style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </td>
    </tr>
  )
}

List.propTypes = {
  values: PropTypes.object,
  price: PropTypes.number,
  handleDeleteItem: PropTypes.func,
  handleEditItem: PropTypes.func,
}

export default List
