import React, { useState, useEffect, useRef } from 'react';
import './Animated.css';

export default function (props) {
  const [containerClass, setContainerClass] = useState('bg-white');

  const prevCountRef = useRef();
  useEffect(() => {
    if (props.value > prevCountRef.current ) {
      setContainerClass('price-up animated');
    } else if (props.value < prevCountRef.current) {
      setContainerClass('price-down animated');
    } else {
      setContainerClass('bg-white');
    }

    prevCountRef.current = props.value;
  }, [props.value]);

  return (
    <div className={containerClass}>
    { props.children }
    </div>
  )
}
