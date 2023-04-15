import PropTypes from 'prop-types'
import React from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Card from './Card'

function CardView({
  onAddItem,
  onDeleteItem,
  onEditItem,
  items,
  prices,
  total,
}) {
  return (
    <>
      <div className="d-flex p-2 mb-2 bg-secondary align-items-center">
        <div className="flex-grow-1 text-white">
          <strong>Total:</strong> {total}
        </div>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="wallet actions"
        >
          <button
            type="button"
            className="btn btn-light ml-auto"
            onClick={onAddItem}
          >
            <PlusIcon style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
      <div className="row">
        {items.map((item) => {
          const asset = prices.filter((price) => price.name === item.currency)
          const price = asset.length > 0 ? asset[0].prices.EUR : 0

          return (
            <Card
              key={item.id}
              values={item}
              price={price}
              handleEditItem={onEditItem}
              handleDeleteItem={onDeleteItem}
            />
          )
        })}
      </div>
    </>
  )
}

CardView.propTypes = {
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  items: PropTypes.array,
  prices: PropTypes.array,
  total: PropTypes.string,
}

export default CardView
