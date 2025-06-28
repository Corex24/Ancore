// lib/pluginLoader.js
const fs = require('fs')
const path = require('path')
const pluginDir = path.join(__dirname, '../plugins')

global.plugins = []

const loadPlugins = () => {
  global.plugins = []
  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'))

  for (const file of files) {
    try {
      const plugin = require(path.join(pluginDir, file))
      if (plugin.name && plugin.run) {
        global.plugins.push(plugin)
        console.log(`✅ Loaded plugin: ${plugin.name}`)
      }
    } catch (e) {
      console.error(`❌ Failed to load plugin ${file}:`, e)
    }
  }
}

module.exports = { loadPlugins }
