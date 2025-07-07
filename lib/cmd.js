// ⚙️ Ancore Command Parser | Match .commands from plugins

import { readdirSync } from 'fs' import { join } from 'path' import { lang } from './lang.js' import { react } from './react.js'

const plugins = []

const pluginPath = join(process.cwd(), 'plugins') const files = readdirSync(pluginPath).filter(file => file.endsWith('.js'))

for (const file of files) { try { const plugin = await import(${pluginPath}/${file}?v=${Date.now()}) if (plugin?.command && plugin.handler) { plugins.push({ ...plugin, name: file.split('.')[0] }) } } catch { continue } }

export async function handleCommand(sock, m, prefix = '.') { if (!m?.body?.startsWith(prefix)) return

const body = m.body.trim() const [cmd, ...args] = body.slice(prefix.length).split(/\s+/) const text = args.join(' ')

for (const plugin of plugins) { if (!plugin.command.includes(cmd)) continue

if (plugin.fromMe && !m.fromMe) return
if (plugin.group && !m.isGroup) return

await react(sock, m, '💙')

try {
  await plugin.handler(sock, m, text)
  await react(sock, m, '✅')
} catch (e) {
  await react(sock, m, '❌')
  await sock.sendMessage(m.chat, {
    text: lang.__('global.error', { cmd })
  })
}
break

} }

