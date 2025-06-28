const { bot } = require('../lib')

bot(
  {
    pattern: 'ping',
    desc: 'Shows bot response time',
    type: 'info',
    dontAddCommandList: true,
  },
  async (message) => {
    const start = Date.now()
    const response = await message.send('_Pinging..._')
    const end = Date.now()

    const pingMs = end - start

    const msg = `
╭── 「 *ANCORE PING* 」
│ 📶 *Response Time:* ${pingMs}ms
│ ✅ *Status:* Online & Stable
╰─────────────────────
    `.trim()

    await response.edit(msg)
  }
)
