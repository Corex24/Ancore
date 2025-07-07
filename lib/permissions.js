// 🛡️ Ancore Permission System | Owner-only + Per-user Command Access Control

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const PERMS_FILE = join(process.cwd(), 'config', 'permissions.json')
let cache = existsSync(PERMS_FILE) ? JSON.parse(readFileSync(PERMS_FILE, 'utf-8')) : {}

// 👑 List of owner JIDs (use full format like 2348036869669@s.whatsapp.net)
export const OWNERS = (process.env.OWNER || '2348036869669')
  .split(',')
  .map(o => o.includes('@') ? o : `${o.trim()}@s.whatsapp.net`)

// 🔐 Check if user is owner
export const isOwner = (jid) => OWNERS.includes(jid)

// 🎯 Grant permission for a command to a user
export const grant = (jid, command) => {
  if (!cache[jid]) cache[jid] = []
  if (!cache[jid].includes(command)) cache[jid].push(command)
  save()
}

// 🚫 Revoke permission
export const revoke = (jid, command) => {
  if (cache[jid]) cache[jid] = cache[jid].filter(c => c !== command)
  save()
}

// ✅ Check if user has access to a command
export const isAllowed = (command, jid) => {
  return isOwner(jid) || (cache[jid] && cache[jid].includes(command))
}

// 💾 Save to file
function save() {
  writeFileSync(PERMS_FILE, JSON.stringify(cache, null, 2))
  }
