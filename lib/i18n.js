// 📁 lib/i18n.js
import path from 'path'
import fs from 'fs'

const LANG_DIR = path.join(process.cwd(), 'lang')

/**
 * Load language JSON file by code, e.g. 'en', 'fr'
 * @param {string} langCode Language code
 * @returns {object} Language key-value pairs
 */
export function loadLanguage(langCode = 'en') {
  try {
    const filePath = path.join(LANG_DIR, `${langCode}.json`)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Language file not found for: ${langCode}`)
    }
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    console.error(`Failed to load language file: ${error.message}`)
    return {}
  }
}

/**
 * Get localized string by key with optional replacements
 * @param {object} lang Language object loaded via loadLanguage
 * @param {string} key Dot notation key, e.g. 'plugin.help.description'
 * @param {object} replacements Optional replacements in string {name: 'John'}
 * @returns {string} Localized string or key if missing
 */
export function t(lang, key, replacements = {}) {
  const keys = key.split('.')
  let result = keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : null), lang)

  if (result === null) return key

  for (const [rKey, rValue] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`{${rKey}}`, 'g'), rValue)
  }
  return result
}
