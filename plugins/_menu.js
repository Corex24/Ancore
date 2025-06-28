const {
  addSpace,
  textToStylist,
  getUptime,
  getRam,
  getDate,
  getPlatform,
  bot,
  lang,
} = require('../lib/')

bot(
  {
    pattern: 'help ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const sorted = ctx.commands
      .slice()
      .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))

    const [date, time] = getDate()

    const helpMsg = [
      `╭─〔 *ANCORE HELP PANEL* 〕`,
      `│ *Hi ${message.pushName}!*`,
      `│`,
      `│ 🕒 *Time:* ${time}`,
      `│ 📆 *Date:* ${date.toLocaleDateString()}`,
      `│ 🗓️ *Day:* ${date.toLocaleString('en', { weekday: 'long' })}`,
      `│ 🧠 *Version:* ${ctx.VERSION}`,
      `│ ⚙️ *Total Commands:* ${ctx.pluginsCount}`,
      `│ 📦 *RAM:* ${getRam()}`,
      `│ ⏱️ *Uptime:* ${getUptime('t')}`,
      `│ 🖥️ *Platform:* ${getPlatform()}`,
      `╰───────────────────◉\n`,
    ]

    sorted.forEach((command, i) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        helpMsg.push(
          ` ${i + 1}. ${addSpace(i + 1, sorted.length)}${textToStylist(command.name.toUpperCase(), 'mono')}`
        )
      }
    })

    await message.send(helpMsg.join('\n'))
  }
)

bot(
  {
    pattern: 'list ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const sorted = ctx.commands
      .slice()
      .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))

    const listMsg = ['╭─〔 *ANCORE COMMAND LIST* 〕\n']

    sorted
      .filter((cmd) => !cmd.dontAddCommandList && cmd.pattern)
      .forEach((cmd) => {
        listMsg.push(`*${textToStylist(cmd.name, 'mono')}*\n${cmd.desc || '_No description available._'}\n`)
      })

    listMsg.push('╰───────────────────◉')

    await message.send(listMsg.join('\n'))
  }
)

bot(
  {
    pattern: 'menu ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const commands = {}

    ctx.commands.forEach((command) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        let type = command.type?.toLowerCase() || 'misc'
        if (!commands[type]) commands[type] = []
        const name = command.name?.trim() || 'unknown'
        commands[type].push(command.active === false ? `${name} [disabled]` : name)
      }
    })

    const [date, time] = getDate()
    const categories = Object.keys(commands).sort()

    let menuText = [
      `╭─〔 *ANCORE BOT MENU* 〕`,
      `│ *Hello ${message.pushName}!*`,
      `│`,
      `│ ⏰ *Time:* ${time}`,
      `│ 📆 *Date:* ${date.toLocaleDateString()}`,
      `│ 📊 *Commands:* ${ctx.pluginsCount}`,
      `│ 🧠 *Version:* ${ctx.VERSION}`,
      `│ ⏱️ *Uptime:* ${getUptime('t')}`,
      `│ 🖥️ *Platform:* ${getPlatform()}`,
      `╰───────────────────◉\n`,
    ]

    if (match && commands[match.toLowerCase()]) {
      const group = commands[match.toLowerCase()]
      menuText.push(`╭─❏ *${textToStylist(match.toUpperCase(), 'smallcaps')} Commands*`)
      group.sort().forEach((cmd) => {
        menuText.push(`│ ${textToStylist(cmd.toUpperCase(), 'mono')}`)
      })
      menuText.push('╰───────────────────◉')
      return await message.send(menuText.join('\n'))
    }

    for (const type of categories) {
      menuText.push(`╭─❏ *${textToStylist(type.toUpperCase(), 'smallcaps')}*`)
      commands[type]
        .sort()
        .forEach((cmd) => {
          menuText.push(`│ ${textToStylist(cmd.toUpperCase(), 'mono')}`)
        })
      menuText.push('╰───────────────────◉\n')
    }

    await message.send(menuText.join('\n'))
  }
)
