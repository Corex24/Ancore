const {
  addSpace,
  textToStylist,
  getUptime,
  getRam,
  getDate,
  getPlatform,
  bot,
  lang
} = require('../lib/')

bot(
  {
    pattern: 'menu ?(.*)',
    desc: lang.plugins.menu?.desc || 'Display command list',
    type: 'misc',
    dontAddCommandList: true
  },
  async (message, match, ctx) => {
    const commands = {}
    const { commands: allCommands, PREFIX, VERSION, pluginsCount } = ctx

    // Organize commands by type
    for (const command of allCommands) {
      if (command.dontAddCommandList || !command.pattern) continue
      const type = (command.type || 'misc').toLowerCase()
      if (!commands[type]) commands[type] = []
      const name = command.name || command.pattern
      const disabled = command.active === false
      commands[type].push(disabled ? `${name} [off]` : name)
    }

    const [date, time] = getDate()

    let header = `╭───〔  💙 ANCORE MENU 〕───⬣
│ Prefix   : ${PREFIX}
│ User     : ${message.pushName}
│ Time     : ${time}
│ Date     : ${date.toLocaleDateString('en-GB')}
│ Version  : ${VERSION}
│ Commands : ${pluginsCount}
│ Platform : ${getPlatform()}
│ RAM      : ${getRam()}
│ Uptime   : ${getUptime('t')}
╰────────────────────────⬣\n`

    // If category requested
    match = match?.toLowerCase()?.trim()
    if (match && commands[match]) {
      const list = commands[match]
        .sort((a, b) => a.localeCompare(b))
        .map(cmd => `│ ◦ ${textToStylist(PREFIX + cmd, 'mono')}`)
        .join('\n')

      return await message.send(
        header + `╭───〔 ${textToStylist(match, 'smallcaps')} COMMANDS 〕───⬣\n${list}\n╰────────────────────────⬣`
      )
    }

    // Show all categories
    let msg = header

    for (const type of Object.keys(commands).sort()) {
      const section = commands[type]
        .sort((a, b) => a.localeCompare(b))
        .map(cmd => `│ ◦ ${textToStylist(PREFIX + cmd, 'mono')}`)
        .join('\n')

      msg += `╭───〔 ${textToStylist(type, 'smallcaps')} 〕───⬣\n${section}\n╰────────────────────────⬣\n`
    }

    return await message.send(msg.trim())
  }
)
