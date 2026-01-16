import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Animated = ({children, value}) => {
    const [trend, setTrend] = useState(0);
    const [announcement, setAnnouncement] = useState('');

    const prevCountRef = useRef();
    useEffect(() => {
        if (prevCountRef.current !== undefined) {
            if (value > prevCountRef.current) {
                setTrend(1);
                setAnnouncement(`Price increased to ${value.toFixed(2)}`);
            } else if (value < prevCountRef.current) {
                setTrend(-1);
                setAnnouncement(`Price decreased to ${value.toFixed(2)}`);
            }
        }
        prevCountRef.current = value;

        const timer = setTimeout(() => {
            setTrend(0);
            setAnnouncement('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [value]);

    const isUp = trend > 0;
    const isDown = trend < 0;
    const isActive = trend !== 0;

    return (
        <div className="relative inline-flex items-center justify-end">
            <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                {announcement}
            </span>
            <span
                className="absolute rounded-lg transition-opacity duration-300 motion-reduce:transition-none pointer-events-none"
                style={{
                    inset: '-0.25rem -1.5rem -0.25rem -0.5rem',
                    backgroundColor: isUp ? 'var(--color-success-light)' : isDown ? 'var(--color-danger-light)' : 'transparent',
                    opacity: isActive ? 1 : 0,
                }}
                aria-hidden="true"
            />
            <span className="relative">{children}</span>
            <span
                className="absolute right-0 translate-x-full pl-1 inline-flex items-center justify-center transition-opacity duration-300 motion-reduce:transition-none"
                style={{ opacity: isActive ? 1 : 0 }}
            >
                {isUp && <FaCaretUp className="w-4 h-4 text-success" aria-hidden="true" />}
                {isDown && <FaCaretDown className="w-4 h-4 text-danger" aria-hidden="true" />}
            </span>
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
