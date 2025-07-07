// 🚀 Ancore Entry Point | Connect Baileys & start the bot

import 'dotenv/config' import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys' import { handleCommand } from './cmd.js' import { Boom } from '@hapi/boom' import { mkdirSync, existsSync } from 'fs' import pino from 'pino' import store from './store.js'

const sessionId = process.env.SESSION_ID || 'ANCORE_SESSION' const sessionFolder = ./sessions/${sessionId} if (!existsSync(sessionFolder)) mkdirSync(sessionFolder, { recursive: true })

const { state, saveCreds } = await useMultiFileAuthState(sessionFolder)

const sock = makeWASocket({ printQRInTerminal: true, auth: state, logger: pino({ level: 'silent' }), browser: ['Ancore', 'Safari', '1.0.0'] })

store.bind(sock.ev)

sock.ev.on('creds.update', saveCreds)

sock.ev.on('messages.upsert', async ({ messages }) => { const m = messages[0] if (!m.message || m.key?.remoteJid === 'status@broadcast') return m.chat = m.key.remoteJid m.fromMe = m.key.fromMe m.sender = m.key.participant || m.key.remoteJid m.body = m.message?.conversation || m.message?.extendedTextMessage?.text || '' m.isGroup = m.chat.endsWith('@g.us') await handleCommand(sock, m) })

sock.ev.on('connection.update', ({ connection, lastDisconnect }) => { if (connection === 'close') { const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut if (shouldReconnect) start() } })

