// 🖼️ Ancore Media Handler | Download and buffer media

import { downloadContentFromMessage } from '@whiskeysockets/baileys' import { writeFileSync } from 'fs' import { tmpdir } from 'os' import { join } from 'path' import { randomBytes } from 'crypto'

export async function getBuffer(m) { const type = Object.keys(m.message || {})[0] const stream = await downloadContentFromMessage(m.message[type], type.replace('Message', '')) const chunks = [] for await (const chunk of stream) chunks.push(chunk) return Buffer.concat(chunks) }

export function randomPath(ext = '.jpg') { return join(tmpdir(), randomBytes(8).toString('hex') + ext) }

export function saveBuffer(buffer, ext = '.jpg') { const path = randomPath(ext) writeFileSync(path, buffer) return path }

