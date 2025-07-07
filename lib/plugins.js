// 🧩 Ancore Plugin Manager | Dynamic Install & Remove Support

import { writeFileSync, unlinkSync } from 'fs'
import { join } from 'path'
import axios from 'axios'
import db from './db.js'
import { logger } from './logger.js'

const PLUGIN_DIR = join(process.cwd(), 'eplugins')

/**
 * 📦 Install plugin from URL
 * @param {string} url - raw plugin file URL (e.g., gist or GitHub raw)
 * @param {string} id - unique message ID (used for filename & reference)
 * @returns {string|null} filename or null on failure
 */
export async function installPlugin(url, id) {
  try {
    const res = await axios.get(url)
    const name = `plugin_${id}.js`
    const path = join(PLUGIN_DIR, name)
    writeFileSync(path, res.data)
    db.plugins = db.plugins || {}
    db.plugins[id] = { url, name }
    logger.success(`✅ Plugin installed: ${name}`)
    return name
  } catch (e) {
    logger.error(`❌ Failed to install plugin from ${url}`, e.message)
    return null
  }
}

/**
 * 🗑 Remove installed plugin
 * @param {string} id - same unique ID used during installation
 * @returns {boolean} true on success, false on failure
 */
export function removePlugin(id) {
  try {
    const data = db.plugins?.[id]
    if (!data) return false
    const path = join(PLUGIN_DIR, data.name)
    unlinkSync(path)
    delete db.plugins[id]
    logger.info(`🗑️ Plugin removed: ${id}`)
    return true
  } catch (e) {
    logger.error(`❌ Failed to remove plugin ${id}`, e.message)
    return false
  }
}
