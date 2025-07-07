// ⏱️ Ancore Format Utilities
import ms from 'ms'

// 🕒 Format uptime in HH:MM:SS
export function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000) % 60
  const minutes = Math.floor(ms / (1000 * 60)) % 60
  const hours = Math.floor(ms / (1000 * 60 * 60))
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
}

function pad(num) {
  return num.toString().padStart(2, '0')
}

// 💾 Format bytes to human-readable
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / Math.pow(1024, i)
  return `${value.toFixed(2)} ${sizes[i]}`
}

// ⏳ Format milliseconds to human-readable
export function formatMs(msTime) {
  return ms(msTime, { long: true })
}
