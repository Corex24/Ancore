// 🎬 Ancore FFmpeg Utils | Audio, Video, Sticker Transformations

import ffmpeg from 'fluent-ffmpeg';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';

const _0x5fd3 = ['mp3', 'output', 'toFormat', 'save', 'on', 'end', 'unlinkSync'];

export async function toMp3(buffer) {
  const id = randomUUID();
  const input = path.join(tmpdir(), `${id}.input`);
  const output = path.join(tmpdir(), `${id}.${_0x5fd3[0]}`);

  writeFileSync(input, buffer);

  return new Promise((resolve, reject) => {
    ffmpeg(input)
      [_0x5fd3[2]](_0x5fd3[0])
      [_0x5fd3[3]](output)
      [_0x5fd3[4]](_0x5fd3[5], () => {
        const mp3Buffer = Buffer.from(require('fs').readFileSync(output));
        unlinkSync(input);
        unlinkSync(output);
        resolve(mp3Buffer);
      })
      [_0x5fd3[4]]('error', (err) => {
        unlinkSync(input);
        reject(err);
      });
  });
      }
