const { bot, lang } = require('../lib/')
const axios = require('axios')

bot(
  {
    pattern: 'apk ?(.*)',
    desc: lang.plugins.apk.desc,
    type: 'downloader',
  },
  async (message, match, ctx) => {
    if (!match) return message.send(lang.plugins.apk.example)
    const response = await axios.get(`https://api.example.com/apk?q=${match}`)
    const apk = response.data
    if (!apk) return message.send(lang.plugins.apk.not_found)
    return message.send(apk.download_link)
  }
)
