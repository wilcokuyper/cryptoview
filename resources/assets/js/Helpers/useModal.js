import { useState } from 'react';

export default () => {
  const [showing, setShowing] = useState(false);

  function toggle()
  {
    setShowing(!showing);
  }

  return [
    showing,
    toggle
  ];
}