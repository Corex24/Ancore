// Corex Anthony 💙 

const fs = require('fs')
const path = require('path')

const langDir = path.join(__dirname, '..', 'lang')
const defaultLang = 'en'
let activeLang = process.env.BOT_LANG || defaultLang
let translations = {}

function loadLang(langCode = defaultLang) {
  const langPath = path.join(langDir, `${langCode}.json`)
  if (!fs.existsSync(langPath)) {
    console.warn(`[LANG] Language file not found: ${langCode}, falling back to English.`)
    langCode = defaultLang
  }

  const data = JSON.parse(fs.readFileSync(path.join(langDir, `${langCode}.json`), 'utf-8'))

  // Add string formatter
  function applyFormatters(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = {
          text: obj[key],
          format(...args) {
            return obj[key].replace(/{(\d+)}/g, (_, i) => args[i] ?? '')
          }
        }
      } else if (typeof obj[key] === 'object') {
        applyFormatters(obj[key])
      }
    }
  }

  applyFormatters(data)
  translations = data
}

function getLang() {
  return translations
}

// Init on load
loadLang(activeLang)

module.exports = getLang()
