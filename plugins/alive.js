const {
  getUptime,
  getRam,
  getDate,
  getPlatform,
  bot,
} = require('../lib')

bot(
  {
    pattern: 'alive',
    desc: 'Check if the bot is alive',
    type: 'info',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const [date, time] = getDate()
    const uptime = getUptime('t')
    const ram = getRam()

    const aliveMsg = `
╭── 「 *ANCORE STATUS* 」
│ 👤 *User:* ${message.pushName}
│ ⚙️ *Version:* ${ctx.VERSION}
│ 🧠 *Commands:* ${ctx.pluginsCount}
│ 🕒 *Uptime:* ${uptime}
│ 💾 *RAM Usage:* ${ram}
│ 📅 *Date:* ${date.toLocaleDateString('en')}
│ ⏰ *Time:* ${time}
│ 💻 *Platform:* ${getPlatform()}
╰─────────────────────
✅ *Ancore is running smoothly!*
    `.trim()

    await message.send(aliveMsg)
  }
)
