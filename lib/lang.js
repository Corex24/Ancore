// 🌐 Ancore Language Handler | Multi-language plugin text 
// Made with 💙 by Corex

import i18n from 'i18n' import { join } from 'path'

const langFolder = join(process.cwd(), 'lang')

// Configure i18n 
i18n.configure({ locales: ['en', 'fr', 'es', 'id', 'de', 'pt', 'tr'], directory: langFolder, defaultLocale: 'en', objectNotation: true, updateFiles: false, syncFiles: false, autoReload: true, register: global })

// 🌍 Export a fallback language loader 
export const lang = i18n

// 🔁 Set language per session (future enhancement) // lang.setLocale('fr')

// Usage: // lang.__('plugins.alive.desc')

