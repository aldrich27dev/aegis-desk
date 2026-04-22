/**
 * Reusable animation variants for Framer Motion
 */

export const ANIMATION_VARIANTS = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },

  // Slide animations
  slideInUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 },
  },

  slideInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },

  slideInLeft: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
    transition: { duration: 0.3 },
  },

  slideInRight: {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
    transition: { duration: 0.3 },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },

  scaleInCenter: {
    initial: { opacity: 0, scale: 0.95, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
    transition: { duration: 0.3 },
  },

  // Card/Modal animations
  cardHover: {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  },

  popIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },

  // Pulse animations
  pulse: {
    animate: { opacity: [0, 1, 0] },
    transition: { repeat: Infinity, duration: 0.8 },
  },

  spin: {
    animate: { rotate: 360 },
    transition: { repeat: Infinity, duration: 1, linear: true },
  },
};

/**
 * Backdrop animation for modals
 */
export const BACKDROP_ANIMATION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

/**
 * Notification toast animations
 */
export const TOAST_ANIMATION = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 },
  transition: { duration: 0.3 },
};

/**
 * Animation delays (in milliseconds)
 */
export const ANIMATION_DELAYS = {
  fast: 1000,
  normal: 1500,
  slow: 2000,
};
