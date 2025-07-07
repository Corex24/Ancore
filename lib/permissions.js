// 🛡️ Ancore Permissions | Command-level access control

import db from './db.js'

const OWNER = process.env.OWNER?.split(',') || []

export function isOwner(id) { return OWNER.includes(id) }

export function getPerm(cmd, jid) { const perms = db.perms || {} return perms[cmd]?.includes(jid) }

export function addPerm(cmd, jid) { db.perms = db.perms || {} db.perms[cmd] = db.perms[cmd] || [] if (!db.perms[cmd].includes(jid)) db.perms[cmd].push(jid) }

export function removePerm(cmd, jid) { db.perms = db.perms || {} db.perms[cmd] = (db.perms[cmd] || []).filter(j => j !== jid) }

export function isAllowed(cmd, jid) { return isOwner(jid) || getPerm(cmd, jid) }

