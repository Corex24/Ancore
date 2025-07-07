// 🌐 Ancore Multi-Language Loader
import { existsSync, readFileSync } from 'fs'
import path from 'path'

const LANG_DIR = path.join(process.cwd(), 'lang')
export const DEFAULT_LANG = 'en'

// 💬 Supported Language Codes
export const SUPPORTED_LANGS = ['en', 'fr', 'es', 'de', 'pt', 'ru', 'zh']

// 🧠 In-memory language cache
const LANG_CACHE = new Map()

// 🔄 Load a specific language JSON
function loadLangFile(code = DEFAULT_LANG) {
  if (LANG_CACHE.has(code)) return LANG_CACHE.get(code)

  const file = path.join(LANG_DIR, `${code}.json`)
  const fallback = path.join(LANG_DIR, `${DEFAULT_LANG}.json`)

  try {
    const raw = existsSync(file) ? readFileSync(file, 'utf-8') : readFileSync(fallback, 'utf-8')
    const parsed = JSON.parse(raw)
    LANG_CACHE.set(code, parsed)
    return parsed
  } catch (err) {
    console.error(`[lang.js] Failed to load lang file for ${code}: ${err.message}`)
    const fallbackData = JSON.parse(readFileSync(fallback, 'utf-8'))
    LANG_CACHE.set(code, fallbackData)
    return fallbackData
  }
}

// 🌍 Get Language JSON by code
export function getLang(code = DEFAULT_LANG) {
  const langCode = SUPPORTED_LANGS.includes(code) ? code : DEFAULT_LANG
  return loadLangFile(langCode)
}
