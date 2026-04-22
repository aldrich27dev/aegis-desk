import { useEffect } from 'react';

/**
 * Custom hook to handle keyboard down events
 * @param {string} key - Key to listen for (e.g., 'Escape', 'Enter')
 * @param {Function} callback - Function to call when key is pressed
 */
export function useKeyDown(key, callback) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === key) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback]);
}
