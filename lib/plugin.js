// 🧩 Dynamic Plugin Loader for Ancore
// Made with 💙 by Corex

import { readdirSync } from 'fs' import { join } from 'path' import logger from './logger.js'

export async function pluginLoader(sock) { const pluginPath = join(process.cwd(), 'plugins') const files = readdirSync(pluginPath).filter(file => file.endsWith('.js'))

logger.info(🔄 Loading ${files.length} plugins...)

for (const file of files) { try { const { command, handler } = await import(${pluginPath}/${file}?v=${Date.now()})

if (!Array.isArray(command) || typeof handler !== 'function') {
    logger.warn(`⚠️ Skipping ${file} — invalid structure.`)
    continue
  }

  logger.success(`✅ Loaded plugin: ${file}`)
} catch (err) {
  logger.error(`❌ Error loading ${file}:`, err.message)
}

}

logger.success('🎉 All plugins initialized!') }

