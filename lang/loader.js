const fs = require('fs')
const path = require('path')
const pluginFolder = path.join(__dirname, '../plugins')

function loadPlugins() {
  const plugins = []
  const files = fs.readdirSync(pluginFolder)
  for (const file of files) {
    if (file.endsWith('.js')) {
      const plugin = require(path.join(pluginFolder, file))
      plugins.push(plugin)
    }
  }
  return plugins
}

module.exports = loadPlugins
