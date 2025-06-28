require('dotenv').config()
const { Boom } = require('@hapi/boom')
const makeWASocket = require('@whiskeysockets/baileys').default
const {
  useMultiFileAuthState,
  DisconnectReason
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const config = require('./config')
const { loadPlugins } = require('./lib/pluginLoader')

const startAncore = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('sessions')
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['ANCORE-MD', 'Corex', '1.0.0']
  })

  loadPlugins() // Load all plugins on start

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

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ''
    const [cmd, ...args] = text.trim().split(/\s+/)

    if (!cmd.startsWith('.')) return

    for (const plugin of global.plugins) {
      if (plugin.command.includes(cmd.slice(1))) {
        try {
          await sock.sendMessage(m.key.remoteJid, { react: { text: '💙', key: m.key } })
          await plugin.run(m, sock, args)
          await sock.sendMessage(m.key.remoteJid, { react: { text: '✅️', key: m.key } })
        } catch (err) {
          console.error(err)
          await sock.sendMessage(m.key.remoteJid, {
            text: `---ERROR REPORT---\nVersion : 1.0.0\nMessage : ${cmd}\nError   : ${err.message}\nJid     : ${m.key.remoteJid}\nCommand : ${cmd.slice(1)}\nPlatform: Render`
          }, { quoted: m })
        }
      }
    }
  })
}

startAncore()
