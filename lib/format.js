// 📁 lib/format.js

/**
 * Format bytes as human-readable text.
 * @param {number} bytes Number of bytes.
 * @param {number} decimals Number of decimals to display.
 * @returns {string} Formatted string like '1.23 MB'
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Format time duration in ms to hh:mm:ss format.
 * @param {number} ms Milliseconds.
 * @returns {string} Formatted string 'hh:mm:ss'
 */
export function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000) % 60
  const minutes = Math.floor(ms / (1000 * 60)) % 60
  const hours = Math.floor(ms / (1000 * 60 * 60))
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':')
}

/**
 * Capitalize the first letter of a string.
 * @param {string} text Input string.
 * @returns {string} Capitalized string.
 */
export function capitalize(text) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
    }
