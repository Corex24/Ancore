// 🎲 Ancore Random Toolkit | Categorized Emojis + Utility Functions
import { v4 as uuidv4 } from 'uuid'

/**
 * Pick a random item from an array
 * @param {any[]} arr
 * @returns {any}
 */
export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Shuffle an array randomly
 * @param {any[]} arr
 * @returns {any[]}
 */
export function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Generate a UUID v4
 * @returns {string}
 */
export function getUUID() {
  return uuidv4()
}

// 💙 Emoji Pools (Safe + Clean)
export const happyEmojis = [
  '💙', '✅', '🟢', '🎉', '🌈', '😎', '🎯',
  '🎮', '🧸', '🎵', '🚀', '📦', '🌟', '🪙',
  '🎁', '📈', '🥳', '🥇', '🔔', '📬'
]

export const warnEmojis = [
  '❌', '⚠️', '🔴', '☠️', '💀', '🛑', '📛', '🚫'
]

export const gameEmojis = [
  '🎮', '🎲', '🕹️', '🧩', '🎯', '📊', '💫', '🌌'
]

export const infoEmojis = [
  '🔔', '🧠', '📌', '📎', '💌', '📤', '📥', '📝'
]

export const chillEmojis = [
  '🌙', '🌌', '🔮', '🎨', '🎭', '📖', '🌺', '💤'
]

/**
 * Get a random emoji by mood or type
 * @param {string} mood 'happy', 'warn', 'game', 'info', 'chill'
 * @returns {string}
 */
export function moodEmoji(mood = 'happy') {
  switch (mood.toLowerCase()) {
    case 'warn': return pickRandom(warnEmojis)
    case 'game': return pickRandom(gameEmojis)
    case 'info': return pickRandom(infoEmojis)
    case 'chill': return pickRandom(chillEmojis)
    default: return pickRandom(happyEmojis)
  }
}

/**
 * Get a totally random emoji from all categories
 * @returns {string}
 */
export function randomEmoji() {
  const all = [
    ...happyEmojis,
    ...warnEmojis,
    ...gameEmojis,
    ...infoEmojis,
    ...chillEmojis
  ]
  return pickRandom(all)
}

/**
 * Generate a random integer between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
