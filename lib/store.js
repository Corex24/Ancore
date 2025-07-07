// 🗃️ Ancore Store | Persisted store for Baileys sessions

import { makeInMemoryStore } from '@whiskeysockets/baileys' import { join } from 'path' import { writeFileSync, existsSync, mkdirSync } from 'fs' import { setInterval } from 'timers'

const storePath = join(process.cwd(), 'store') if (!existsSync(storePath)) mkdirSync(storePath)

const store = makeInMemoryStore({ logger: undefined })

setInterval(() => { store.writeToFile(join(storePath, 'store.json')) }, 30_000)

export default store

