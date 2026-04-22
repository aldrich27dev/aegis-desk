import { useState, useCallback } from 'react';

/**
 * Custom hook for managing chat messages
 * @param {Array} initialMessages - Initial messages array
 * @returns {Object} { messages, addMessage, clearMessages }
 */
export function useMessages(initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages);

  const addMessage = useCallback((message) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...message,
      },
    ]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, addMessage, clearMessages };
}
