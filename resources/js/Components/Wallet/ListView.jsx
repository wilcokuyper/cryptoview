import PropTypes from 'prop-types'
import React from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import List from './List'

function ListView({
  onAddItem,
  onDeleteItem,
  onEditItem,
  items,
  prices,
  total,
}) {
  return (
    <>
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-primary ml-auto d-inline-flex align-items-center"
          onClick={onAddItem}
        >
          <PlusIcon style={{ width: '20px', height: '20px' }} /> Add
        </button>
      </div>
      <table className="table table-responsive-md table-hover">
        <thead>
          <tr>
            <th scope="col" width="50">
              Currency
            </th>
            <th scope="col" width="150" className="text-right">
              Avg. Price
            </th>
            <th scope="col" width="150" className="text-right">
              Amount
            </th>
            <th scope="col" width="150" className="text-right">
              Total
            </th>
            <th scope="col" width="200" className="text-right">
              Last update
            </th>
            <th scope="col" className="text-right" width="50"></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td>Total:</td>
            <td colSpan="3" className="text-right">
              {total}
            </td>
            <td colSpan="2"></td>
          </tr>
        </tfoot>
        <tbody>
          {items.map((item) => {
            const asset = prices.filter((price) => price.name === item.currency)
            const price = asset.length > 0 ? asset[0].prices.EUR : 0
            return (
              <List
                key={item.id}
                values={item}
                price={price}
                handleEditItem={onEditItem}
                handleDeleteItem={onDeleteItem}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}

ListView.propTypes = {
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  items: PropTypes.array,
  prices: PropTypes.array,
  total: PropTypes.string,
}

export default ListView