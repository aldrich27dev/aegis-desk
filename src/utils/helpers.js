import { PRIORITY_STYLES } from '../constants/styles';

/**
 * Get priority badge styles
 * @param {string} priority - Priority level (High, Medium, Low)
 * @returns {string} Tailwind class string
 */
export function getPriorityStyles(priority) {
  return PRIORITY_STYLES[priority]?.full || PRIORITY_STYLES.Medium.full;
}

/**
 * Get priority color only
 * @param {string} priority - Priority level
 * @returns {string} Color class
 */
export function getPriorityColor(priority) {
  return PRIORITY_STYLES[priority]?.text || PRIORITY_STYLES.Medium.text;
}

/**
 * Format ticket ID for display
 * @param {string} id - Raw ticket ID
 * @returns {string} Formatted ID
 */
export function formatTicketId(id) {
  return id?.toUpperCase() || 'N/A';
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 50) {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format time ago
 * @param {string|Date} timestamp - Timestamp
 * @returns {string} Formatted time
 */
export function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Recently';

  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}y ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}mo ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}d ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}h ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}m ago`;

  return `${Math.floor(seconds)}s ago`;
}

/**
 * Safely parse JSON with fallback
 * @param {string} jsonString - JSON string to parse
 * @param {any} fallback - Fallback value if parsing fails
 * @returns {any} Parsed or fallback value
 */
export function safeJsonParse(jsonString, fallback = null) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
