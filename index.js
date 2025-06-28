require('dotenv').config()
const { Boom } = require('@hapi/boom')
const makeWASocket = require('@whiskeysockets/baileys').default
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const pino = require('pino')
const config = require('./config')
const handleEvents = require('./lib/events')
require('./lib/cmd') // Load all plugins

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

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return
    await handleEvents(sock, m)
  })
}

startAncore()
