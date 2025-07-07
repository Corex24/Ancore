// 🧩 Dynamic Plugin Loader for Ancore WhatsApp Bot 
// Made with 💙 by Corex

import { readdirSync } from 'fs' import { join } from 'path' import logger from './logger.js'

/**

Plugin system for Ancore

Each plugin must export: command[], handler()

Optional: fromMe, group, desc, type, category */


export async function pluginLoader(sock) { const pluginPath = join(process.cwd(), 'plugins') const files = readdirSync(pluginPath).filter(file => file.endsWith('.js'))

logger.info(🧩 Scanning ${files.length} plugins...)

for (const file of files) { try { const { command, handler } = await import(${pluginPath}/${file}?v=${Date.now()})

if (!Array.isArray(command) || typeof handler !== 'function') {
    logger.warn(`⚠️ Skipped ${file} — invalid plugin format`)
    continue
  }

  logger.success(`✅ Registered: ${file}`)
} catch (err) {
  logger.error(`❌ Plugin load error: ${file} →`, err.message)
}

}

logger.success('🚀 Plugins are now live!') }

