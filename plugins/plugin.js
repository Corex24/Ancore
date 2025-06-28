const fs = require('fs')
const path = require('path')
const axios = require('axios')

module.exports = {
  name: 'plugin',
  command: ['plugin', 'addplugin'],
  tags: ['owner'],
  run: async (m, sock, args) => {
    const url = args[0]
    if (!url || !url.startsWith('http')) {
      return sock.sendMessage(m.key.remoteJid, {
        text: '❌ Please provide a valid raw plugin URL (.js file).'
      }, { quoted: m })
    }

    try {
      const pluginCode = (await axios.get(url)).data
      const fileName = 'plugin_' + Date.now() + '.js'
      const filePath = path.join(__dirname, fileName)

      fs.writeFileSync(filePath, pluginCode)

      return sock.sendMessage(m.key.remoteJid, {
        text: `✅ Plugin installed as: ${fileName}`
      }, { quoted: m })

    } catch (err) {
      console.error(err)
      return sock.sendMessage(m.key.remoteJid, {
        text: '❌ Failed to fetch or save plugin.'
      }, { quoted: m })
    }
  }
                              }
