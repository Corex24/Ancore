// 📡 Ancore Event Hooks | Handles group joins, leaves, and future events

import { downloadProfilePic } from './utils.js'
import { sendImage } from './send.js'
import { logger } from './logger.js'
import lang from './lang.js'

const WELCOME_IMAGE = 'https://files.catbox.moe/nucjyx.jpeg'
const GOODBYE_IMAGE = 'https://files.catbox.moe/ji30fs.jpeg'

/**
 * 🪩 Handle participant join
 */
export async function onParticipantAdd(sock, update) {
  try {
    const { id, participants } = update
    for (const user of participants) {
      const pp = await downloadProfilePic(sock, user)
      await sendImage(sock, id, {
        image: { url: WELCOME_IMAGE },
        caption: `👋 ${lang.plugins.greetings.welcome.replace('%user%', `@${user.split('@')[0]}`)}`,
        mentions: [user]
      }, pp)
    }
  } catch (e) {
    logger.error(`❌ Welcome error:`, e.message)
  }
}

/**
 * 🎭 Handle participant leave
 */
export async function onParticipantRemove(sock, update) {
  try {
    const { id, participants } = update
    for (const user of participants) {
      const pp = await downloadProfilePic(sock, user)
      await sendImage(sock, id, {
        image: { url: GOODBYE_IMAGE },
        caption: `😢 ${lang.plugins.greetings.goodbye.replace('%user%', `@${user.split('@')[0]}`)}`,
        mentions: [user]
      }, pp)
    }
  } catch (e) {
    logger.error(`❌ Goodbye error:`, e.message)
  }
}
