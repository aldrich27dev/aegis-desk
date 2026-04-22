import { memo, useState, useCallback } from 'react';
import { Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '../hooks';
import { ANIMATION_VARIANTS, ANIMATION_DELAYS } from '../constants/animations';


const ChatMessage = memo(({ message }) => (
  <motion.div
    initial={{ opacity: 0, x: message.role === 'ai' ? -10 : 10 }}
    animate={{ opacity: 1, x: 0 }}
    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
        message.role === 'user'
          ? 'bg-blue-600 text-white'
          : 'bg-brand-bg border border-brand-border text-zinc-300'
      }`}
    >
      {message.text}
    </div>
  </motion.div>
));

ChatMessage.displayName = 'ChatMessage';


const ChatHeader = memo(() => (
  <div className="p-4 border-b border-brand-border bg-blue-600/5 flex items-center gap-2">
    <Bot size={16} className="text-blue-400" />
    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Grok Copilot</span>
  </div>
));

ChatHeader.displayName = 'ChatHeader';


const ChatInput = memo(({ input, onInputChange, onSend, onKeyDown }) => (
  <div className="p-3 bg-brand-bg border-t border-brand-border flex gap-2">
    <input
      value={input}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      placeholder="Ask AI for help..."
      className="flex-1 bg-brand-surface border border-brand-border rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 transition-all"
    />
    <button
      onClick={onSend}
      className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors active:scale-95"
      aria-label="Send message"
    >
      <Send size={14} />
    </button>
  </div>
));

ChatInput.displayName = 'ChatInput';

/**
 * ChatBox - AI chat interface with message history
 * @component
 * @param {string} ticketId - ID of the ticket being discussed
 */
function ChatBox({ ticketId }) {
  const [input, setInput] = useState('');
  const { messages, addMessage } = useMessages([
    { role: 'ai', text: `I've analyzed ticket ${ticketId}. How can I assist with the resolution?` },
  ]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    // Add user message
    addMessage({ role: 'user', text: input });
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      addMessage({
        role: 'ai',
        text: 'I\'m processing that request. Based on previous similar tickets, I recommend checking the firewall logs for port 443.',
      });
    }, ANIMATION_DELAYS.normal);
  }, [input, addMessage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="flex flex-col h-[400px] bg-brand-surface border border-brand-border rounded-2xl overflow-hidden mt-6">
      <ChatHeader />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
      </div>

      <ChatInput
        input={input}
        onInputChange={(e) => setInput(e.target.value)}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default memo(ChatBox);