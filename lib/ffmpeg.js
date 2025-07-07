// 🎞️ Ancore FFmpeg Utility | Audio/Video processor

import ffmpeg from 'fluent-ffmpeg' import { tmpdir } from 'os' import { randomBytes } from 'crypto' import { join } from 'path' import { unlinkSync } from 'fs'

function tmp(ext = '.mp4') { return join(tmpdir(), randomBytes(6).toString('hex') + ext) }

export async function toMp3(inputBuffer) { return new Promise((resolve, reject) => { const input = tmp('.ogg') const output = tmp('.mp3') import('fs').then(fs => { fs.writeFileSync(input, inputBuffer) ffmpeg(input) .audioCodec('libmp3lame') .on('end', () => { const data = fs.readFileSync(output) unlinkSync(input) unlinkSync(output) resolve(data) }) .on('error', reject) .save(output) }) }) }

