import { memo } from 'react';
import { motion } from 'framer-motion';
import { useTypeWriter } from '../../hooks';
import { ANIMATION_VARIANTS } from '../../constants/animations';

/**
 * TypingCursor - Animated blinking cursor for typewriter effect
 */
const TypingCursor = memo(() => (
  <motion.span
    {...ANIMATION_VARIANTS.pulse}
    className="inline-block w-1.5 h-3.5 bg-blue-500 ml-1 align-middle"
  />
));

TypingCursor.displayName = 'TypingCursor';

/**
 * AIResponseBox - Displays AI response with typewriter animation
 * @component
 * @param {string} text - Text to display with typing effect
 * @param {number} speed - Speed of typing animation (default: 20ms)
 */
function AIResponseBox({ text, speed = 20 }) {
  const { displayedText, isTyping } = useTypeWriter(text, speed);

  return (
    <div className="relative group">
      {/* Gradient glow background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000" />

      {/* Response content */}
      <div className="relative bg-brand-bg rounded-lg p-4 text-zinc-300 font-mono text-xs border border-brand-border leading-relaxed min-h-[80px]">
        {displayedText}
        {isTyping && <TypingCursor />}
      </div>
    </div>
  );
}

export default memo(AIResponseBox);