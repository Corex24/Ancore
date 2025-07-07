// 🌐 Ancore Language Loader | Multi-Language Plugin Support System

import { existsSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'

const LANG_PATH = join(process.cwd(), 'lang')
const DEFAULT_LANG = process.env.LANGUAGE || 'en'

let loadedLang = {}
let currentLang = DEFAULT_LANG

/**
 * 🧠 Load all JSON language files into memory
 */
export const loadLanguages = () => {
  const files = readdirSync(LANG_PATH).filter(f => f.endsWith('.json'))
  for (const file of files) {
    const langCode = file.replace('.json', '')
    const filePath = join(LANG_PATH, file)
    if (existsSync(filePath)) {
      try {
        const content = JSON.parse(readFileSync(filePath, 'utf-8'))
        loadedLang[langCode] = content
      } catch (e) {
        console.error(`❌ Failed to load ${file}:`, e.message)
      }
    }
  }
  console.log(`🌍 Loaded ${Object.keys(loadedLang).length} language(s)`)
}

/**
 * 🌐 Change language globally
 */
export const setLanguage = (langCode) => {
  if (loadedLang[langCode]) {
    currentLang = langCode
    return true
  }
  return false
}

/**
 * 📦 Access language data
 */
export const lang = new Proxy(
  {},
  {
    get: (_, key) => {
      return loadedLang[currentLang]?.[key] || {}
    }
  }
)
