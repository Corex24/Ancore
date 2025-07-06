const { getUptime, bot, lang } = require('../lib')

bot(
  {
    pattern: 'alive',
    desc: lang.plugins.alive.desc,
    type: 'misc'
  },
  async (message) => {
    const uptime = getUptime('t')
    const status = lang.plugins.alive.alive_message.format(uptime)
    return await message.send(status)
  }
)
