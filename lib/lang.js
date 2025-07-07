// 🌐 Ancore Language Loader | Multi-language support

import { existsSync, readFileSync } from 'fs' import { join } from 'path'

const LANG = process.env.LANG || 'en' const LANGS_PATH = join(process.cwd(), 'lang') const defaultLang = join(LANGS_PATH, 'en.json')

function loadLang(lang) { const path = join(LANGS_PATH, ${lang}.json) if (!existsSync(path)) return {} return JSON.parse(readFileSync(path)) }

const strings = loadLang(LANG) const fallback = loadLang('en')

export const lang = { __(key, vars = {}) { const str = strings[key] || fallback[key] || key return str.replace(/{(.*?)}/g, (_, v) => vars[v] || '') }, plugins: strings.plugins || fallback.plugins || {}, global: strings.global || fallback.global || {} }

