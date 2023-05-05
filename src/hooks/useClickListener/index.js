import { useEffect } from 'react';

export const useOutsideClickListener = ({ ref, onClickOutside }) => {
  useEffect(() => {
    const mouseDownEventHandler = (event) => {
      // Checking ref contains target element
      if (ref.current && !ref?.current?.contains?.(event.target)) {
        onClickOutside();
      }
    };

    // Add event listener for mousedown
    document.addEventListener('mousedown', mouseDownEventHandler);

    return () => {
      // Remove event listener for mousedown on component unmount
      document.removeEventListener('mousedown', mouseDownEventHandler);
    };
  }, [ref, onClickOutside]);
};
