/**
 * Priority styles mapping
 */
export const PRIORITY_STYLES = {
  High: {
    text: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
    full: 'text-red-400 bg-red-400/10 border-red-400/20',
  },
  Medium: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    full: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  },
  Low: {
    text: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    full: 'text-green-400 bg-green-400/10 border-green-400/20',
  },
};

/**
 * Notification type styles
 */
export const NOTIFICATION_STYLES = {
  error: {
    bg: 'bg-red-500/10',
    icon: 'text-red-500',
  },
  info: {
    bg: 'bg-blue-500/10',
    icon: 'text-blue-500',
  },
  success: {
    bg: 'bg-green-500/10',
    icon: 'text-green-500',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    icon: 'text-yellow-500',
  },
};

/**
 * Navigation items configuration
 */
export const NAV_ITEMS = [
  { label: 'Overview', icon: 'LayoutDashboard' },
  { label: 'Tickets', icon: 'Ticket' },
  { label: 'AI Insights', icon: 'Bot' },
  { label: 'Security', icon: 'ShieldCheck' },
  { label: 'Audit', icon: 'Terminal' },
  { label: 'Settings', icon: 'Settings' },
];

/**
 * Animation delays
 */
export const ANIMATION_DELAYS = {
  fast: 1000,
  normal: 1500,
  slow: 2000,
};
