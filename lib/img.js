// 🖼️ Ancore Image Tools | Buffer, Base64, Remote Downloader

import axios from 'axios'
import fs from 'fs'
import path from 'path'
import imageToBase64 from 'image-to-base64'

/**
 * Download image as buffer from URL
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
export async function getImageBuffer(url) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  })
  return Buffer.from(res.data)
}

/**
 * Convert image to base64 from URL or file
 * @param {string} src - URL or local path
 * @returns {Promise<string>}
 */
export async function getBase64Image(src) {
  try {
    return await imageToBase64(src)
  } catch (e) {
    throw new Error('❌ Failed to convert image to base64')
  }
}

/**
 * Save remote image to local temp file
 * @param {string} url
 * @param {string} filename
 */
export async function downloadImage(url, filename = 'download.jpg') {
  const img = await getImageBuffer(url)
  const filepath = path.join('./media', filename)
  fs.writeFileSync(filepath, img)
  return filepath
  }
