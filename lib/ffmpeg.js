// 🎛️ Ancore FFmpeg Engine | Media Effect Toolkit for Audio & Video Filters

import { exec } from 'child_process'
import { writeFileSync, unlinkSync, existsSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { randomBytes } from 'crypto'

/**
 * 🌀 Apply FFmpeg filters to audio or video buffer
 * @param {Buffer} inputBuffer - Raw audio/video data
 * @param {string} filter - FFmpeg audio/video filter string
 * @param {string} ext - File extension (e.g., mp3, ogg, mp4)
 * @returns {Promise<Buffer>} Processed output buffer
 */
export async function applyFilter(inputBuffer, filter, ext = 'mp3') {
  const id = randomBytes(6).toString('hex')
  const input = join(tmpdir(), `ancore_in_${id}.${ext}`)
  const output = join(tmpdir(), `ancore_out_${id}.${ext}`)

  try {
    writeFileSync(input, inputBuffer)

    const cmd = `ffmpeg -y -i "${input}" ${filter} "${output}"`
    await new Promise((resolve, reject) => {
      exec(cmd, (err) => (err ? reject(err) : resolve()))
    })

    if (!existsSync(output)) throw new Error('FFmpeg output missing')

    return Buffer.from(await Bun.file(output).arrayBuffer())
  } finally {
    try {
      unlinkSync(input)
      unlinkSync(output)
    } catch {}
  }
}
