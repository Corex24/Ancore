const { bot, lang } = require('../lib/')

bot(
  {
    pattern: 'alive',
    desc: lang.plugins.alive.desc,
    type: 'misc',
  },
  async (message, match, ctx) => {
    return message.send(lang.plugins.alive.alive_message, { quoted: message.data }, 'text', ctx.p)
  }
)
