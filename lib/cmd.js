const fs = require('fs')
const path = require('path')

global.plugins = {}

const pluginsFolder = path.join(__dirname, '../plugins')

fs.readdirSync(pluginsFolder).forEach(file => {
  if (file.endsWith('.js')) {
    try {
      const plugin = require(path.join(pluginsFolder, file))
      if (plugin.name) {
        global.plugins[plugin.name] = plugin
      }
    } catch (err) {
      console.error(`❌ Error loading plugin: ${file}`, err)
    }
  }
})

console.log(`✅ Loaded ${Object.keys(global.plugins).length} plugins.`)
