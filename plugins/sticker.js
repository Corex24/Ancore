const fs = require('fs')
const { tmpdir } = require('os')
const { join } = require('path')
const { fromBuffer } = require('file-type')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('ffmpeg-static')
const { toSticker } = require('@adiwajshing/ffmpeg')

ffmpeg.setFfmpegPath(ffmpegPath)

module.exports = {
  name: 'sticker',
  command: ['sticker', 's'],
  tags: ['media'],
  run: async (m, sock) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage
    const mime = quoted?.imageMessage
      ? 'image'
      : quoted?.videoMessage
      ? 'video'
      : null

    if (!quoted || !mime) {
      return await sock.sendMessage(m.key.remoteJid, {
        text: '⚠️ Reply to an image or short video with `.sticker`.'
      }, { quoted: m })
    }

    const mediaMsg = mime === 'image'
      ? quoted.imageMessage
      : quoted.videoMessage

    const buffer = await sock.downloadMediaMessage({ message: { [mime + 'Message']: mediaMsg } })
    const fileType = await fromBuffer(buffer)
    const inputPath = join(tmpdir(), `ancore_input.${fileType.ext}`)
    const outputPath = join(tmpdir(), `ancore_sticker.webp`)

    fs.writeFileSync(inputPath, buffer)

    try {
      await toSticker(inputPath, outputPath, {
        pack: '💙°CoReX °💙',
        author: 'Ancore'
      })

      const stickerBuffer = fs.readFileSync(outputPath)
      await sock.sendMessage(m.key.remoteJid, { sticker: stickerBuffer }, { quoted: m })

    } catch (err) {
      console.error(err)
      await sock.sendMessage(m.key.remoteJid, {
        text: '❌ Error creating sticker.'
      }, { quoted: m })
    } finally {
      fs.unlinkSync(inputPath)
      fs.unlinkSync(outputPath)
    }
  }
}
