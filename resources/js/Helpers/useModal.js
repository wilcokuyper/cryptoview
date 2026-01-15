import { useState, useCallback } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    const toggle = useCallback(() => {
        setIsShowing(prev => !prev);
    }, []);

    const open = useCallback(() => {
        setIsShowing(true);
    }, []);

    const close = useCallback(() => {
        setIsShowing(false);
    }, []);

    return { isShowing, toggle, open, close };
};

export default useModal;