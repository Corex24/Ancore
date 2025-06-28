const fs = require('fs')
const path = require('path')
const axios = require('axios')

module.exports = {
  name: 'plugin',
  command: ['plugin', 'addplugin'],
  tags: ['owner'],
  run: async (m, sock, args) => {
    const url = args[0]
    if (!url || !url.endsWith('.js')) {
      return sock.sendMessage(m.key.remoteJid, {
        text: '❌ Provide a valid direct URL to a plugin `.js` file.'
      }, { quoted: m })
    }

    try {
      const response = await axios.get(url)
      const code = response.data
      const filename = `plugin_${Date.now()}.js`
      const filepath = path.join(__dirname, filename)

      fs.writeFileSync(filepath, code)

      await sock.sendMessage(m.key.remoteJid, {
        text: `✅ Plugin installed as \`${filename}\`. Restart bot to activate.`
      }, { quoted: m })
    } catch (e) {
      console.error(e)
      await sock.sendMessage(m.key.remoteJid, {
        text: '❌ Failed to install plugin.'
      }, { quoted: m })
    }
  }
}
