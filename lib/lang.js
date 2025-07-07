// 🌐 Ancore Language Handler | Multi-language plugin text

import i18n from 'i18n' import { join } from 'path'

const langFolder = join(process.cwd(), 'lang')

i18n.configure({ locales: ['en', 'fr', 'es', 'id', 'de', 'pt', 'tr'], directory: langFolder, defaultLocale: 'en', objectNotation: true, updateFiles: false, syncFiles: false, autoReload: true, register: global })

export const lang = i18n

