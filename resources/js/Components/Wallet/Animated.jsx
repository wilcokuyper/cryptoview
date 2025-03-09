import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import './Animated.css';
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const Animated = ({children, value}) => {
    const [trend, setTrend] = useState(0);

    let containerClass = '';
    let Icon = null;
    if (trend > 0) {
        containerClass = 'price-up';
        Icon = FaChevronUp;
    } else if (trend < 0) {
        containerClass = 'price-down';
        Icon = FaChevronDown;
    }

    const prevCountRef = useRef();
    useEffect(() => {
        if (value > prevCountRef.current ) {
            setTrend(1);
        } else if (value < prevCountRef.current) {
            setTrend(-1);
        } else {
            setTrend(0);
        }

        prevCountRef.current = value;
    }, [value]);

    return (
        <div className={`animated ${containerClass} d-flex align-items-center justify-content-end`}>
            { children }
            {Icon !== null && <Icon aria-hidden="true" className="ml-1" />}
        </div>
    );
};

Animated.propTypes = {
    value: PropTypes.number,
    children: PropTypes.string
};

export default Animated;
