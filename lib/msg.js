// 💬 Ancore Message Helper | Send, Reply & Media Shortcut

/**
 * Reply to a message with text
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {import('@whiskeysockets/baileys').proto.IWebMessageInfo} m
 * @param {string} text
 */
export async function reply(sock, m, text) {
  return await sock.sendMessage(m.chat, { text }, { quoted: m })
}

/**
 * Send a fresh message (not as a reply)
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {string} jid
 * @param {string} text
 */
export async function send(sock, jid, text) {
  return await sock.sendMessage(jid, { text })
}

/**
 * Send media (image/video/sticker)
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {string} jid
 * @param {Buffer|String} media
 * @param {'image'|'video'|'sticker'} type
 * @param {object} options
 */
export async function sendMedia(sock, jid, media, type = 'image', options = {}) {
  return await sock.sendMessage(jid, { [type]: media, ...options })
}
