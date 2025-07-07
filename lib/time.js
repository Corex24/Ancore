// ⏱️ Ancore Time Tools | Uptime, Formatting, Cooldown

import ms from 'ms'
import moment from 'moment-timezone'

/**
 * Format milliseconds into readable uptime
 * @param {number} ms
 * @returns {string}
 */
export function formatUptime(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${h}h ${m}m ${s}s`
}

/**
 * Get current time in a specific timezone (e.g., Africa/Lagos)
 * @param {string} zone
 * @returns {string}
 */
export function getTime(zone = 'Africa/Lagos') {
  return moment().tz(zone).format('HH:mm:ss')
}

/**
 * Convert duration like 5m, 1h to milliseconds
 * @param {string} time
 * @returns {number}
 */
export function toMilliseconds(time) {
  return ms(time)
}

/**
 * Convert milliseconds to human-friendly duration
 * @param {number} duration
 */
export function duration(duration) {
  return ms(duration, { long: true })
}
