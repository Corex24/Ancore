const { bot, lang } = require('../lib')

const afkMap = new Map()

bot(
  {
    pattern: 'afk ?(.*)',
    desc: lang.plugins.afk?.desc || 'Set yourself AFK',
    type: 'user'
  },
  async (message, reason) => {
    afkMap.set(message.sender, {
      time: Date.now(),
      reason: reason || 'AFK'
    })
    await message.send(`💤 ${message.pushName} is now AFK: ${reason || 'No reason'}`)
  }
)

// Check if AFK
bot(
  {
    on: 'message',
    fromMe: false
  },
  async (message) => {
    const mentioned = message.mention || []
    for (const user of mentioned) {
      if (afkMap.has(user)) {
        const afk = afkMap.get(user)
        const ago = Math.floor((Date.now() - afk.time) / 1000)
        await message.reply(
          `⏱ *${user.split('@')[0]}* is AFK for ${ago}s\nReason: ${afk.reason}`
        )
      }
    }
  }
)
