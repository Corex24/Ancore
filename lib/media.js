// 📸 Ancore Media Utilities | Image, Audio, Video & Sticker Tools
import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import ffmpeg from 'fluent-ffmpeg'
import sharp from 'sharp'
import { fromBuffer } from 'file-type'
import { randomUUID } from 'crypto'

const tempPath = (ext = '') => join(tmpdir(), `${Date.now()}-${randomUUID()}${ext}`)

/**
 * Convert audio to mp3 (e.g., for voice filters)
 * @param {Buffer} buffer
 * @returns {Promise<Buffer>}
 */
export async function toMP3(buffer) {
  const input = tempPath('.ogg')
  const output = tempPath('.mp3')
  writeFileSync(input, buffer)
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .audioCodec('libmp3lame')
      .save(output)
      .on('end', () => {
        const mp3 = readFileSync(output)
        unlinkSync(input)
        unlinkSync(output)
        resolve(mp3)
      })
      .on('error', reject)
  })
}

/**
 * Convert image to WebP format for stickers
 * @param {Buffer} buffer
 * @returns {Promise<Buffer>}
 */
export async function toWebp(buffer) {
  return await sharp(buffer)
    .resize(512, 512, { fit: 'cover' })
    .webp({ quality: 90 })
    .toBuffer()
}

/**
 * Resize image
 * @param {Buffer} buffer
 * @param {number} width
 * @param {number} height
 * @returns {Promise<Buffer>}
 */
export async function resizeImage(buffer, width = 512, height = 512) {
  return await sharp(buffer).resize(width, height).toBuffer()
}

/**
 * Detect mime type and extension
 * @param {Buffer} buffer
 * @returns {Promise<{ mime: string, ext: string }>}
 */
export async function detectFile(buffer) {
  const type = await fromBuffer(buffer)
  return type || { mime: 'application/octet-stream', ext: 'bin' }
}
