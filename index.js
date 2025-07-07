// 🚀 Ancore WhatsApp Bot 
// Powered by Safari WebSocket Engine | Made with 💙 by Corex

import makeWASocket, { DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';

import { Boom } from '@hapi/boom'; import pino from 'pino'; import { join } from 'path'; import { readdirSync } from 'fs'; import logger from './lib/logger.js'; import { pluginLoader } from './lib/plugin.js'; import './lib/lang.js';

const SESSION_ID = process.env.SESSION_ID || 'ANCORE_SAFARI';

async function startAncore() { const { version } = await fetchLatestBaileysVersion(); const { state, saveCreds } = await useMultiFileAuthState(join('./store/sessions', SESSION_ID));

const sock = makeWASocket({ version, printQRInTerminal: true, browser: ['Ancore Safari', 'Safari', '1.0.0'], auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) }, logger: pino({ level: 'silent' }), markOnlineOnConnect: true, generateHighQualityLinkPreview: true, syncFullHistory: false, getMessage: async () => ({ conversation: 'Ancore • Made by Corex 💙' }) });

sock.ev.on('creds.update', saveCreds);

sock.ev.on('connection.update', ({ connection, lastDisconnect }) => { if (connection === 'close') { const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut; logger.warn(🔌 Disconnected. Reconnect? ${shouldReconnect}); if (shouldReconnect) startAncore(); } else if (connection === 'open') { logger.success('✅ Connected to WhatsApp as Ancore'); } });

pluginLoader(sock);

sock.ev.on('messages.upsert', async ({ messages }) => { const m = messages[0]; if (!m?.message || m.key?.remoteJid === 'status@broadcast') return;

try {
  const handlerPath = join('./plugins');
  const files = readdirSync(handlerPath).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const { command, handler, fromMe, group } = await import(`${handlerPath}/${file}?v=${Date.now()}`);

    const body = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    const prefix = '.';
    const text = body.startsWith(prefix) ? body.slice(1) : '';
    const match = text.split(' ')[0].toLowerCase();

    if (command.includes(match)) {
      if (fromMe && !m.key.fromMe) return;
      if (group && !m.key.remoteJid?.endsWith('@g.us')) return;

      await sock.sendMessage(m.key.remoteJid, { react: { text: '💙', key: m.key } });

      await handler(sock, m, text.slice(match.length).trim());

      await sock.sendMessage(m.key.remoteJid, { react: { text: '✅️', key: m.key } });
      await sock.sendMessage(m.key.remoteJid, { react: { text: '', key: m.key } });
    }
  }
} catch (err) {
  await sock.sendMessage(m.key.remoteJid, { react: { text: '❌️', key: m.key } });
  await sock.sendMessage(m.key.remoteJid, { react: { text: '', key: m.key } });
  logger.error('❌ Message handler error:', err);
}

}); }

startAncore();

