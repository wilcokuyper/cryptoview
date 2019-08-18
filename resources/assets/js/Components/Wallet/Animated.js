import React, { useState, useEffect, useRef } from 'react';
import './Animated.css';

export default props => {
  const [containerClass, setContainerClass] = useState('');

  const prevCountRef = useRef();
  useEffect(() => {
    if (props.value > prevCountRef.current ) {
      setContainerClass('price-up animated');
    } else if (props.value < prevCountRef.current) {
      setContainerClass('price-down animated');
    } else {
      setContainerClass('');
    }

    prevCountRef.current = props.value;
  }, [props.value]);

  return (
    <div className={containerClass}>
    { props.children }
    </div>
  )
}
