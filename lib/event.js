module.exports = async function handleEvents(sock, m) {
  try {
    const body = m.message?.conversation || 
                 m.message?.extendedTextMessage?.text || ''
    const prefix = '.'

    if (!body.startsWith(prefix)) return

    const [cmd, ...args] = body.slice(1).trim().split(/\s+/)
    const command = cmd.toLowerCase()

    const plugin = Object.values(global.plugins).find(p => 
      p.command?.includes(command)
    )

    if (plugin) {
      await plugin.run(m, sock, args)
    }

  } catch (err) {
    console.error('❌ Event handling error:', err)
  }
}
