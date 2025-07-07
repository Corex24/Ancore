// 🧿 Ancore - Powered by Corex 💙 
// Safari Machine | Baileys Multi-Device v6.7.18
// Welcome to the future of bots... Sit tight, let's go 🚀

import makeWASocket, { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'; import { Boom } from '@hapi/boom'; import pino from 'pino'; import { join } from 'path'; import { readdirSync } from 'fs'; import { pluginLoader } from './lib/plugin.js'; import { saveSession } from './lib/database.js'; import logger from './lib/logger.js'; import './lib/lang.js';

const SESSION_ID = process.env.SESSION_ID || 'ANCORE_SAFARI';

(async function startAncore() { const { version } = await fetchLatestBaileysVersion(); const { state, saveCreds } = await useMultiFileAuthState(join('./store/sessions', SESSION_ID));

const sock = makeWASocket({ version, printQRInTerminal: true, browser: ['Ancore Safari', 'Safari', '1.0.0'], auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) }, logger: pino({ level: 'silent' }), markOnlineOnConnect: true, generateHighQualityLinkPreview: true, syncFullHistory: false, getMessage: async () => ({ conversation: 'Ancore • Multi-Device WhatsApp Bot 💙' }) });

sock.ev.on('creds.update', saveCreds);

sock.ev.on('connection.update', ({ connection, lastDisconnect }) => { if (connection === 'close') { const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut; logger.warn(Connection closed. Reconnect? ${shouldReconnect}); if (shouldReconnect) startAncore(); } else if (connection === 'open') { logger.success('✅ Connected as Ancore Safari — Made by Corex with 💙'); saveSession(SESSION_ID); } });

pluginLoader(sock); // 🧩 Load all Ancore plugins like magic

sock.ev.on('messages.upsert', async ({ messages }) => { const m = messages[0]; if (!m?.message || m.key?.remoteJid === 'status@broadcast') return;

try {
  const handlerPath = join('./plugins');
  const files = readdirSync(handlerPath).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const { command, handler, fromMe, group } = await import(`${handlerPath}/${file}?v=${Date.now()}`);
    const body = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    const prefix = '.'; // 🔧 Change your prefix here if needed
    const text = body.startsWith(prefix) ? body.slice(1) : '';
    const match = text.split(' ')[0].toLowerCase();

    if (command.includes(match)) {
      if (fromMe && !m.key.fromMe) return;
      if (group && !m.key.remoteJid?.endsWith('@g.us')) return;
      await handler(sock, m, text.slice(match.length).trim());
    }
  }
} catch (err) {
  logger.error('❌ Plugin error:', err);
}

}); })(); // ✨ The Corex Engine ignites!

