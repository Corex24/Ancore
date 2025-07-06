// Corex Anthony 💙

const fs = require('fs')
const path = require('path')

const pluginDirectory = path.join(__dirname, '..', 'plugins')
const plugins = []

function loadPlugins() {
  plugins.length = 0
  const files = fs.readdirSync(pluginDirectory).filter((file) => file.endsWith('.js'))

  for (const file of files) {
    const fullPath = path.join(pluginDirectory, file)
    try {
      const module = require(fullPath)
      if (Array.isArray(module)) {
        for (const cmd of module) {
          registerPlugin(cmd)
        }
      } else {
        registerPlugin(module)
      }
    } catch (e) {
      console.error(`[Plugin Load Error] ${file}:`, e.message)
    }
  }
}

function registerPlugin(plugin) {
  if (!plugin || typeof plugin !== 'object' || !plugin.command || !plugin.operate) return

  const name = Array.isArray(plugin.command) ? plugin.command[0] : plugin.command
  plugins.push({
    ...plugin,
    name,
    pattern: name,
    type: plugin.type || 'misc',
    fromMe: plugin.fromMe || false,
    dontAddCommandList: plugin.dontAddCommandList || false,
    desc: plugin.desc || '',
  })
}

function getPlugins() {
  return plugins
}

module.exports = { loadPlugins, getPlugins }
