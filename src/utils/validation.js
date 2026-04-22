/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} Is valid
 */
export function isRequired(value) {
  return value !== null && value !== undefined && value !== '';
}

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} min - Minimum length
 * @returns {boolean} Is valid
 */
export function minLength(value, min) {
  return value && value.length >= min;
}

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} max - Maximum length
 * @returns {boolean} Is valid
 */
export function maxLength(value, max) {
  return !value || value.length <= max;
}
