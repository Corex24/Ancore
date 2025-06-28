const fs = require('fs')
const path = require('path')

module.exports = {
  name: 'remplugin',
  command: ['remplugin'],
  tags: ['owner'],
  run: async (m, sock, args) => {
    const file = args[0]
    if (!file || !file.endsWith('.js')) {
      return sock.sendMessage(m.key.remoteJid, {
        text: '⚠️ Please specify a plugin filename to remove.'
      }, { quoted: m })
    }

    const pluginPath = path.join(__dirname, file)
    if (!fs.existsSync(pluginPath)) {
      return sock.sendMessage(m.key.remoteJid, {
        text: '❌ Plugin not found.'
      }, { quoted: m })
    }

    fs.unlinkSync(pluginPath)
    return sock.sendMessage(m.key.remoteJid, {
      text: `✅ Plugin \`${file}\` removed successfully.`
    }, { quoted: m })
  }
}
