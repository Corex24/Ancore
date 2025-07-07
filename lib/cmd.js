// 🧠 Ancore Command Handler | Loads + Executes Plugins

import { existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { react } from './react.js'
import { isGroup } from './utils.js'
import { isOwner, isAllowed } from './permissions.js'
import { logger } from './logger.js'
import db from './db.js'

const prefix = process.env.PREFIX || '.'
const PLUGIN_PATH = join(process.cwd(), 'plugins')

const plugins = new Map()

async function loadPlugins() {
  const files = readdirSync(PLUGIN_PATH).filter(f => f.endsWith('.js'))

  for (const file of files) {
    const full = join(PLUGIN_PATH, file)
    try {
      const mod = await import(`file://${full}#${Date.now()}`)
      const cmd = mod.command?.map(c => c.toLowerCase()) || []
      for (const c of cmd) plugins.set(c, { ...mod, file })
    } catch (e) {
      logger.error(`❌ Plugin failed: ${file}`, e.message)
    }
  }

  logger.success(`🔌 Plugins loaded: ${plugins.size}`)
}

export async function handleCommand(sock, m) {
  const msg =
    m?.message?.conversation ||
    m?.message?.extendedTextMessage?.text ||
    ''

  if (!msg.startsWith(prefix)) return

  const [rawCmd, ...args] = msg.slice(prefix.length).trim().split(/\s+/)
  const cmd = rawCmd.toLowerCase()
  const plug = plugins.get(cmd)
  if (!plug) return

  const { fromMe, group, owner, handler } = plug
  const sender = m.key.participant || m.key.remoteJid
  const isGroupMsg = isGroup(m.key.remoteJid)
  const isSenderOwner = isOwner(sender)
  const allowed = isAllowed(cmd, sender)

  if (fromMe && !m.fromMe) return
  if (group && !isGroupMsg) return
  if (owner && !isSenderOwner && !allowed) return

  try {
    await react(sock, m, '💙')
    await handler(sock, m, args.join(' '), { command: cmd, plug })
    await react(sock, m, '✅')
  } catch (e) {
    logger.error(`❌ ${cmd} error:`, e.message)
    await react(sock, m, '❌')
    await sock.sendMessage(m.chat, {
      text: `*ERROR:* ${e.message}\n\nCommand: .${cmd}`
    }, { quoted: m })
  }
}

await loadPlugins()
