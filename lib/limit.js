// 🕒 Ancore | Fast Cooldown System to Prevent Spam Without Affecting UX

const cooldowns = new Map()

/**
 * Checks if a user is within cooldown for a command
 * @param {string} jid - WhatsApp user JID
 * @param {string} command - Command name
 * @param {number} delay - Cooldown in ms (default: 1500ms)
 * @returns {boolean} - true if in cooldown
 */
export function isCooldown(jid, command, delay = 1500) {
  const key = `${jid}:${command}`
  const now = Date.now()

  if (!cooldowns.has(key)) {
    cooldowns.set(key, now)
    return false
  }

  const lastUsed = cooldowns.get(key)
  if (now - lastUsed < delay) return true

  cooldowns.set(key, now)
  return false
}
