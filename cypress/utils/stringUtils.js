/**
 * String Utilities
 * Helper functions for string manipulation
 */

/**
 * Generate random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
export const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/**
 * Generate random email
 * @param {string} domain - Email domain (default: example.com)
 * @returns {string} Random email address
 */
export const generateRandomEmail = (domain = 'example.com') => {
  const randomString = generateRandomString(10)
  return `test_${randomString}@${domain}`
}

/**
 * Generate random number within range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export const generateRandomNumber = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Format date to string
 * @param {Date} date - Date object
 * @param {string} format - Format string (default: 'YYYY-MM-DD')
 * @returns {string} Formatted date string
 */
export const formatDate = (date = new Date(), format = 'YYYY-MM-DD') => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
}

/**
 * Truncate string
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncateString = (str, maxLength = 50) => {
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength) + '...'
}

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
