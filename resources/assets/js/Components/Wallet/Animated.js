import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import './Animated.css';
import {ArrowCircleDownIcon, ArrowCircleUpIcon} from "@heroicons/react/solid";

const renderPriceIcon = delta => {
    switch (delta) {
        case -1:
            return <ArrowCircleDownIcon className="h-4 text-red-600"/>
        case 1:
            return <ArrowCircleUpIcon className="h-4 text-green-600" />
        default:
            return null;
    }
}

const Animated = ({children, value}) => {
    const [priceDelta, setPriceDelta] = useState(0);

    const prevCountRef = useRef();
    useEffect(() => {
        if (value > prevCountRef.current ) {
            setPriceDelta(1);
        } else if (value < prevCountRef.current) {
            setPriceDelta(-1);
        } else {
            setPriceDelta(0);
        }

        prevCountRef.current = value;
    }, [value]);

    return (
        <div className="flex items-center">
            <div className={`${priceDelta === 1 ? "price-up" : priceDelta === -1 ? "price-down" : ""} animated  ml-auto`}>
                { children }
            </div>
            <div className="flex-grow-0 ml-2">
            { renderPriceIcon(priceDelta) }
            </div>
        </div>
    );
};

Animated.propTypes = {
    value: PropTypes.number,
    children: PropTypes.string
};

export default Animated;
