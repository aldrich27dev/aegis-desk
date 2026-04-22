import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle click outside element
 * @param {Function} callback - Function to call when click outside detected
 * @returns {Object} ref - React ref to attach to element
 */
export function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback]);

  return ref;
}
