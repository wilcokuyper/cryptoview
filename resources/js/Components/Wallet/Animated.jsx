import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import './Animated.css';

const Animated = ({children, value}) => {
    const [containerClass, setContainerClass] = useState('');

    const prevCountRef = useRef();
    useEffect(() => {
        if (value > prevCountRef.current ) {
            setContainerClass('price-up animated');
        } else if (value < prevCountRef.current) {
            setContainerClass('price-down animated');
        } else {
            setContainerClass('');
        }

        prevCountRef.current = value;
    }, [value]);

    return (
        <div className={containerClass}>
            { children }
        </div>
    );
};

Animated.propTypes = {
    value: PropTypes.number,
    children: PropTypes.string
};

export default Animated;