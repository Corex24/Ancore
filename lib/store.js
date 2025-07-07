// 🧠 Ancore Store | In-Memory Data Store for AFK, Games, Warns, and More

const store = {
  afk: new Map(),          // userJid => { time, reason }
  warns: new Map(),        // userJid => warnCount
  tictactoe: new Map(),    // messageId => gameState
  sessions: new Map(),     // sessionId => { user, platform, lastSeen }
  limits: new Map(),       // userJid => { command: count }
  flood: new Map(),        // userJid => [timestamps]
}

/**
 * 🚶 Set AFK status for a user
 */
export const setAfk = (jid, reason = 'AFK') => {
  store.afk.set(jid, { time: Date.now(), reason })
}

/**
 * 🔍 Get AFK info of a user
 */
export const getAfk = (jid) => {
  return store.afk.get(jid)
}

/**
 * ❌ Remove AFK status
 */
export const clearAfk = (jid) => {
  store.afk.delete(jid)
}

/**
 * ⚠️ Increase warning count
 */
export const addWarn = (jid) => {
  const count = store.warns.get(jid) || 0
  store.warns.set(jid, count + 1)
  return count + 1
}

/**
 * ✅ Clear warnings
 */
export const clearWarn = (jid) => {
  store.warns.delete(jid)
}

/**
 * 🎮 TicTacToe store helpers
 */
export const setTicTacToe = (msgId, game) => store.tictactoe.set(msgId, game)
export const getTicTacToe = (msgId) => store.tictactoe.get(msgId)
export const delTicTacToe = (msgId) => store.tictactoe.delete(msgId)

/**
 * 🧠 Limit tracker
 */
export const trackCommand = (jid, cmd) => {
  const user = store.limits.get(jid) || {}
  user[cmd] = (user[cmd] || 0) + 1
  store.limits.set(jid, user)
  return user[cmd]
}

/**
 * 🧹 Reset memory store (e.g. on restart)
 */
export const resetStore = () => {
  for (const key in store) {
    if (store[key].clear) store[key].clear()
  }
}
