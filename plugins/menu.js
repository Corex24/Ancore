const moment = require('moment-timezone')
const os = require('os')
const config = require('../config')
const lang = require(`../lang/${config.LANGUAGE || 'en'}.json`)

module.exports = {
  name: 'menu',
  command: ['menu', 'help'],
  tags: ['main'],
  run: async (m, sock) => {
    const now = moment().tz(config.TIMEZONE || 'Africa/Lagos')
    const time = now.format('hh:mm A')
    const date = now.format('DD/MM/YYYY')
    const uptime = process.uptime()
    const up = new Date(uptime * 1000).toISOString().substr(11, 8)

    const menuText = `
╭═══ 💙 ANCORE 💙 ═══⊷
│ ${lang.prefix} .
│ ${lang.user} ${m.pushName}
│ ${lang.time} ${time}
│ ${lang.date} ${date}
│ ${lang.version} 1.0.0
│ ${lang.plugins} 170+
│ ${lang.uptime} ${up}
│ ${lang.platform} Render (${os.platform()})
│ ${lang.tz} ${config.TIMEZONE}
╰════════════════⊷`.trim()

    await sock.sendMessage(m.chat, { text: menuText }, { quoted: m })
    await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
  }
               }
