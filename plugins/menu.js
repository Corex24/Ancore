const os = require('os')
const moment = require('moment-timezone')
const { execSync } = require('child_process')

let startTime = Date.now()

module.exports = {
  name: 'menu',
  command: ['menu', 'help', '?'],
  tags: ['main'],
  run: async (m, sock) => {
    const prefix = '.'
    const user = 'Corex'
    const version = '1.0.0'
    const pluginCount = global.plugins.length
    const uptimeMs = Date.now() - startTime
    const uptime = formatUptime(uptimeMs)
    const timezone = 'Africa/Lagos'
    const now = moment().tz(timezone)
    const platform = os.platform() === 'linux' ? 'Render (Linux)' : os.platform()

    const menu = `
╭═══ ANCORE ═══⊷
│ Prefix  : ${prefix}
│ User    : ${user}
│ Time    : ${now.format('hh:mm A')}
│ Date    : ${now.format('DD/MM/YYYY')}
│ Version : ${version}
│ Plugins : ${pluginCount}+
│ Uptime  : ${uptime}
│ Platform: ${platform}
│ Timezone: ${timezone}
╰════════════════⊷`.trim()

    await sock.sendMessage(m.key.remoteJid, { text: menu }, { quoted: m })
  }
}

function formatUptime(ms) {
  const sec = Math.floor((ms / 1000) % 60)
  const min = Math.floor((ms / (1000 * 60)) % 60)
  const hr = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hr}h ${min}m ${sec}s`
}
