import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter effect
 * @param {string} text - Text to type out
 * @param {number} speed - Speed of typing in milliseconds (default: 20)
 * @returns {Object} { displayedText, isTyping }
 */
export function useTypeWriter(text, speed = 20) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isTyping };
}
