import { makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } from '@whiskeysockets/baileys'
import QRCode from 'qrcode'
import NodeCache from 'node-cache'
import { Boom } from '@hapi/boom'

const groupCache = new NodeCache()
const phoneNumber = process.env.OWNER_NUMBER || '2348036869669' // customize as needed

async function startAncore() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys')

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: Browsers.macOS('AncoreBot'),
    cachedGroupMetadata: async (jid) => groupCache.get(jid)
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log(await QRCode.toString(qr, { type: 'terminal', small: true }))
    }

    if (connection === 'close') {
      const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
      console.log('🔌 Disconnected. Reconnect?', shouldReconnect)
      if (shouldReconnect) {
        startAncore()
      }
    }

    if (connection === 'open') {
      console.log('✅ Connected to WhatsApp as Ancore')
    }
  })
}

startAncore()
