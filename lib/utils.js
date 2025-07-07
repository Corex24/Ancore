// 🧰 Ancore Utils | Core helper functions for commands

import { jidNormalizedUser } from '@whiskeysockets/baileys' import ms from 'ms'

export function parsedJid(text = '') { const regex = /\d{5,20}@g.us|\d{5,20}@s.whatsapp.net/g return (text.match(regex) || []) }

export function isGroup(id = '') { return id.endsWith('@g.us') }

export function isUser(id = '') { return id.endsWith('@s.whatsapp.net') }

export function formatMs(msTime) { return ms(parseInt(msTime)) }

export function toJid(id = '') { return jidNormalizedUser(id) }

export function pickRandom(list = []) { return list[Math.floor(Math.random() * list.length)] }

export function escapeRegex(str) { return str.replace(/[.*+?^${}()|[]\]/g, '\$&') }

