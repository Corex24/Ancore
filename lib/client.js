import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} from '@whiskeysockets/baileys'
import fs from 'fs-extra'
import path from 'path'
import { readdirSync } from 'fs'
import { logger } from './logger.js'
import dotenv from 'dotenv'
dotenv.config()

export async function startClient() {
  const sessionId = process.env.SESSION_ID || 'ANCORE_Default'
  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${sessionId}`)
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger,
    browser: ['Ancore MD', 'Safari', '1.0.0'],
    printQRInTerminal: true,
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  // Load Plugins
  const plugins = {}
  const files = readdirSync('./plugins').filter(f => f.endsWith('.js'))
  for (const file of files) {
    try {
      const plugin = await import(`../plugins/${file}`)
      plugins[file.split('.')[0]] = plugin.default
      logger.info(`✅ Loaded: ${file}`)
    } catch (err) {
      logger.error(`❌ Failed loading ${file}:`, err.message)
    }
  }

  // Handle messages
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.remoteJid === 'status@broadcast') return

    const prefix = process.env.PREFIX || '.'
    const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ''
    if (!body.startsWith(prefix)) return

    const [cmd, ...args] = body.slice(prefix.length).trim().split(/\s+/)
    const command = cmd.toLowerCase()

    if (plugins[command]) {
      try {
        await plugins[command](sock, msg, args)
      } catch (e) {
        logger.error(`Error in ${command}:`, e)
        await sock.sendMessage(msg.key.remoteJid, { text: '❌ Plugin error' }, { quoted: msg })
      }
    }
  })

  // Connection status
  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) startClient()
    } else if (connection === 'open') {
      logger.info('🟢 Connected to WhatsApp')
    }
  })
    }
