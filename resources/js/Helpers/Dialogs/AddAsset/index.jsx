import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

function AddAsset({ onSubmit, onCancel }) {
  const [currencies, setCurrencies] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [amount, setAmount] = useState('')
  const shouldLoad = useRef(true)

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      if (shouldLoad.current) {
        const res = await axios.post(
          '/api/currencies',
          {
            q: selectedCurrency,
          },
          { signal: controller.signal },
        )
        setCurrencies(res.data)
      }
    }

    load()

    return () => controller.abort()
  }, [selectedCurrency])

  const handleChange = async (e) => {
    shouldLoad.current = true
    setSelectedCurrency(e.target.value)
  }

  const handleSelect = (e) => {
    e.preventDefault()
    shouldLoad.current = false
    setSelectedCurrency(e.target.dataset.currency || '')
    setCurrencies([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ currency: selectedCurrency, amount })
  }

  const renderCurrencies = () =>
    currencies.length > 0 && (
      <div
        className="position-absolute w-100 overflow-auto bg-white px-2 border rounded"
        style={{ zIndex: 1, maxHeight: 'calc(5*31px)' }}
      >
        {currencies.map((currency) => (
          <a
            key={currency.id}
            href="#"
            className="d-block p-1 border-bottom"
            data-currency={currency.symbol}
            onClick={handleSelect}
          >
            {currency.name}
          </a>
        ))}
      </div>
    )

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="form-group position-relative">
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            name="currency"
            className="form-control"
            placeholder="e.g. BTC"
            value={selectedCurrency}
            required
            onChange={handleChange}
          />
          {renderCurrencies()}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            value={amount}
            placeholder="1.000"
            min="0"
            max="99999999.99999999"
            step="0.00000001"
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">
          Add
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

AddAsset.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

export default AddAsset
