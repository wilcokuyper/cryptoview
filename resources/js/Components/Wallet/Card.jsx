import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import Animated from './Animated'
import './Card.scss'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'

function Card({ values, price, handleEditItem, handleDeleteItem }) {
  const [historicalData, setHistoricalData] = useState([])
  const [historicalDataLoading, setHistoricalDataLoading] = useState(true)
  const { id, currency, amount, updated_at } = values

  useEffect(() => {
    async function getHistoricalData(currency) {
      const res = await axios.get(`api/history?currency=${currency}&count=30`)
      setHistoricalData(res.data)
      setHistoricalDataLoading(false)
    }

    getHistoricalData(currency)

    const interval = setInterval(() => getHistoricalData(currency), 60000)

    return () => clearInterval(interval)
  }, [currency])

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card mb-2 p-2">
        <div className="d-flex mb-1">
          <h3 className="flex-grow-1">{currency}</h3>
          <div>
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
          </div>
        </div>
        <div className="d-flex">
          <div className="flex-grow-1 asset-graph">
            {historicalDataLoading ? (
              <div className="asset-graph-loading">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : (
              <Sparklines data={historicalData} margin={20}>
                <SparklinesLine
                  style={{
                    strokeWidth: 2,
                    stroke: '#336aff',
                    fill: 'none',
                  }}
                />
                <SparklinesSpots
                  size={3}
                  style={{
                    stroke: '#336aff',
                    strokeWidth: 2,
                    fill: 'white',
                  }}
                />
              </Sparklines>
            )}
          </div>
          <div className="asset-data">
            <h5 className="text-right">
              <Animated value={price}>
                <strong>{numeral(price).format('0,0.00')}</strong>
              </Animated>
            </h5>
            <div className="text-right">
              {numeral(amount).format('0,0.0000')}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="text-left">{moment(updated_at).format('D-M-Y')}</div>
          <div className="text-right">
            <i>{numeral(price * amount).format('0,0.00')}</i>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  values: PropTypes.object,
  price: PropTypes.number,
  handleDeleteItem: PropTypes.func,
  handleEditItem: PropTypes.func,
}

export default Card
