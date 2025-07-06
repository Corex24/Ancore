// Corex Anthony 💙 

const { Pool } = require('pg')

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

async function ensureTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS permissions (
      session_id TEXT,
      user_jid TEXT,
      command TEXT
    );
  `)
}

// Call on load
ensureTable()

async function setUserAccess(userJid, commands = [], allow = true, sessionId = 'ANCORE_DEFAULT') {
  if (!userJid || !commands.length) return false
  if (allow) {
    for (const cmd of commands) {
      await db.query(
        `INSERT INTO permissions (session_id, user_jid, command)
         VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING;`,
        [sessionId, userJid, cmd]
      )
    }
  } else {
    for (const cmd of commands) {
      await db.query(
        `DELETE FROM permissions WHERE session_id = $1 AND user_jid = $2 AND command = $3;`,
        [sessionId, userJid, cmd]
      )
    }
  }
  return true
}

async function getUserAccess(userJid, command, sessionId = 'ANCORE_DEFAULT') {
  const { rows } = await db.query(
    `SELECT * FROM permissions WHERE session_id = $1 AND user_jid = $2 AND command = $3;`,
    [sessionId, userJid, command]
  )
  return rows.length > 0
}

async function getUserAllowedCommands(userJid, sessionId = 'ANCORE_DEFAULT') {
  const { rows } = await db.query(
    `SELECT command FROM permissions WHERE session_id = $1 AND user_jid = $2;`,
    [sessionId, userJid]
  )
  return rows.map((r) => r.command)
}

module.exports = {
  setUserAccess,
  getUserAccess,
  getUserAllowedCommands
  }
