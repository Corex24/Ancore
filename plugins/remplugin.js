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
        text: '❌ Please provide a valid plugin filename to remove.'
      }, { quoted: m })
    }

    const filepath = path.join(__dirname, file)
    if (!fs.existsSync(filepath)) {
      return sock.sendMessage(m.key.remoteJid, {
        text: '❌ Plugin not found.'
      }, { quoted: m })
    }

    fs.unlinkSync(filepath)
    await sock.sendMessage(m.key.remoteJid, {
      text: `✅ Plugin \`${file}\` removed. Restart bot to unload.`
    }, { quoted: m })
  }
}
