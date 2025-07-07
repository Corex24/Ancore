// 🧠 Ancore Local Database | JSON-based store system

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs' import { join } from 'path'

const DB_PATH = join(process.cwd(), 'store') const DB_FILE = join(DB_PATH, 'db.json')

if (!existsSync(DB_PATH)) mkdirSync(DB_PATH) if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, '{}')

let data = JSON.parse(readFileSync(DB_FILE))

export const db = { read() { data = JSON.parse(readFileSync(DB_FILE)) return data }, write() { writeFileSync(DB_FILE, JSON.stringify(data, null, 2)) }, set(key, value) { data[key] = value this.write() }, get(key) { return data[key] }, delete(key) { delete data[key] this.write() }, all() { return data } }

