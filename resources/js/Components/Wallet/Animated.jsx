import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Animated = ({children, value}) => {
    const [trend, setTrend] = useState(0);

    let animationClass = '';
    let Icon = null;
    if (trend > 0) {
        animationClass = 'animate-price-up';
        Icon = FaChevronUp;
    } else if (trend < 0) {
        animationClass = 'animate-price-down';
        Icon = FaChevronDown;
    }

    const prevCountRef = useRef();
    useEffect(() => {
        if (value > prevCountRef.current) {
            setTrend(1);
        } else if (value < prevCountRef.current) {
            setTrend(-1);
        } else {
            setTrend(0);
        }

        prevCountRef.current = value;
    }, [value]);

    return (
        <div className={`flex items-center justify-end ${animationClass}`}>
            {children}
            {Icon !== null && <Icon aria-hidden="true" className="ml-1"/>}
        </div>
    );
};

Animated.propTypes = {
    value: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

export default Animated;
