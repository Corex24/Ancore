import { default as makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import P from 'pino';
import dotenv from 'dotenv';

dotenv.config();

const logger = P({ level: 'silent' });

async function startAncore() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');

  const sock = makeWASocket({
    logger,
    printQRInTerminal: true,
    auth: state,
    browser: ['Ancore', 'Chrome', '120.0.0.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const shouldReconnect =
        new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;

      logger.warn(`🔌 Disconnected. Reconnect? ${shouldReconnect}`);

      if (shouldReconnect) startAncore();
    } else if (connection === 'open') {
      logger.info('✅ Connected to WhatsApp as Ancore');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    if (text.toLowerCase() === '.ping') {
      await sock.sendMessage(msg.key.remoteJid, { text: '🏓 Pong!' }, { quoted: msg });
    }
  });
}

startAncore();
