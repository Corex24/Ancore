require('dotenv').config()
const { Boom } = require('@hapi/boom')
const makeWASocket = require('@whiskeysockets/baileys').default
const {
  useMultiFileAuthState,
  DisconnectReason
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')
const config = require('./config')

// Start the ANCORE bot
const startAncore = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('sessions')
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['ANCORE-MD', 'Corex', '1.0.0']
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode
      if (reason === DisconnectReason.loggedOut) {
        console.log('🔌 Session logged out.')
      } else {
        console.log('🔁 Reconnecting...')
        startAncore()
      }
    } else if (connection === 'open') {
      console.log('✅ ANCORE Bot Connected.')
    }
  })

  // Load language
  const lang = require(`./lang/${config.LANGUAGE || 'en'}.json`)

  // Load all plugins from /plugins
  const pluginFolder = path.join(__dirname, 'plugins')
  const plugins = []

  fs.readdirSync(pluginFolder).forEach(file => {
    if (file.endsWith('.js')) {
      const plugin = require(path.join(pluginFolder, file))
      plugins.push(plugin)
    }
  })

  // Listen for messages
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const text = m.message.conversation || m.message.extendedTextMessage?.text || ''
    if (!text.startsWith('.')) return

    const [cmd, ...args] = text.slice(1).trim().split(' ')
    const plugin = plugins.find(p => p.command.includes(cmd))

    if (plugin) {
      await sock.sendMessage(m.key.remoteJid, { react: { text: '💙', key: m.key } })
      try {
        await plugin.run(m, sock, args)
        await sock.sendMessage(m.key.remoteJid, { react: { text: '✅', key: m.key } })
      } catch (err) {
        console.error(err)
        await sock.sendMessage(m.key.remoteJid, {
          text: `---ERROR REPORT---\nVersion : 1.0.0\nMessage : ${text}\nError   : ${err.message}\nJid     : ${m.key.remoteJid}\nCommand : ${cmd}\nPlatform: Render`
        }, { quoted: m })
      }
    }
  })
}

startAncore()
