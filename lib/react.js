// 💬 Ancore Reaction Handler | Adds, changes, or removes WhatsApp reactions

/**
 * Send a reaction emoji to a message
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {import('@whiskeysockets/baileys').proto.IWebMessageInfo} m
 * @param {string|null} emoji
 */
export const react = async (sock, m, emoji = null) => {
  try {
    await sock.sendMessage(m.key.remoteJid, {
      react: {
        text: emoji || '', // empty string clears it
        key: m.key,
      },
    })
  } catch (e) {
    console.error('❌ Reaction failed:', e.message)
  }
}
