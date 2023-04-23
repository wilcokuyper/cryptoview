import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import './Animated.css'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'

function Animated({ children, value }) {
  const [status, setStatus] = useState('')

  const prevCountRef = useRef()

  useEffect(() => {
    if (value > prevCountRef.current) {
      setStatus('increase')
    } else if (value < prevCountRef.current) {
      setStatus('decrease')
    } else {
      setStatus('')
    }

    prevCountRef.current = value
  }, [value])

  return (
    <div
      className={classNames(
        'd-flex align-middle justify-content-end animated',
        {
          'price-up': status === 'increase',
          'price-down': status === 'decrease',
        },
      )}
    >
      <div>{children}</div>
      <div>
        {status === 'increase' && <ChevronUpIcon style={{ height: 20 }} />}
        {status === 'decrease' && <ChevronDownIcon style={{ height: 20 }} />}
        {status === '' && <MinusIcon style={{ height: 20 }} />}
      </div>
    </div>
  )
}

Animated.propTypes = {
  value: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Animated
