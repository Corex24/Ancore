// 🗃️ Ancore Store Handler | Simple in-memory message store

import { makeInMemoryStore } from '@whiskeysockets/baileys' import { join } from 'path' import { existsSync, mkdirSync } from 'fs'

const storePath = join(process.cwd(), 'store', 'data')

if (!existsSync(storePath)) { mkdirSync(storePath, { recursive: true }) }

const store = makeInMemoryStore({ logger: undefined }) store.readFromFile(join(storePath, 'messages.json')) setInterval(() => { store.writeToFile(join(storePath, 'messages.json')) }, 10_000)

export default store

