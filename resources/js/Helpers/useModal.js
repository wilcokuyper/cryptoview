import { useState } from 'react';

const useModal = () => {
    const [showing, setShowing] = useState(false);

    function toggle()
    {
        setShowing(!showing);
    }

    return [
        showing,
        toggle
    ];
};

export default useModal;