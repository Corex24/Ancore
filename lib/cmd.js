// 📁 lib/cmd.js
import { readdirSync } from 'fs'
import { join, extname } from 'path'
import { logger } from './logger.js'

const prefix = process.env.PREFIX || '.'
const plugins = new Map()

/**
 * Load all plugin command files from plugins directory
 */
export async function loadPlugins() {
  const pluginDir = join(process.cwd(), 'plugins')
  const files = readdirSync(pluginDir).filter(file => extname(file) === '.js')
  for (const file of files) {
    const fullPath = join(pluginDir, file)
    try {
      // Import fresh module to avoid cache
      const mod = await import(`file://${fullPath}?update=${Date.now()}`)
      const cmds = mod.command?.map(c => c.toLowerCase()) || []
      for (const cmd of cmds) {
        plugins.set(cmd, { ...mod, file })
      }
    } catch (error) {
      logger.error(`❌ Failed to load plugin ${file}: ${error.message}`)
    }
  }
  logger.success(`🔌 Loaded ${plugins.size} plugins`)
}

/**
 * Handle incoming message commands
 * @param {object} sock - Baileys socket instance
 * @param {object} m - Incoming message object
 */
export async function handleCommand(sock, m) {
  const msgText = m.message?.conversation || m.message?.extendedTextMessage?.text || ''
  if (!msgText.startsWith(prefix)) return

  const [rawCmd, ...args] = msgText.slice(prefix.length).trim().split(/\s+/)
  const cmd = rawCmd.toLowerCase()
  const plugin = plugins.get(cmd)
  if (!plugin) return

  const { fromMe, group, owner, handler } = plugin
  const sender = m.key.participant || m.key.remoteJid
  const isGroupMsg = m.key.remoteJid.endsWith('@g.us')
  const isSenderOwner = owner ? sender === process.env.OWNER_JID : true

  if (fromMe && !m.fromMe) return
  if (group && !isGroupMsg) return
  if (owner && !isSenderOwner) return

  try {
    await handler(sock, m, args.join(' '), { command: cmd, plugin })
  } catch (error) {
    logger.error(`❌ Error in command .${cmd}: ${error.message}`)
    await sock.sendMessage(m.chat, {
      text: `*ERROR:* ${error.message}\n\nCommand: .${cmd}`
    }, { quoted: m })
  }
}

await loadPlugins()
