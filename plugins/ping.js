const { bot, performance, lang } = require('../lib')

bot(
  {
    pattern: 'ping',
    desc: lang.plugins.ping.desc,
    type: 'misc'
  },
  async (message) => {
    const start = performance.now()
    await message.send(lang.plugins.ping.ping_sent)
    const end = performance.now()
    const time = Math.floor(end - start)
    await message.send(lang.plugins.ping.pong.format(time))
  }
)
