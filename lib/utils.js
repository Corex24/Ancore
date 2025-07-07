// 🛠️ Ancore Utilities | Common Tools & Helpers for Bot Operations

import axios from 'axios'
import { writeFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { randomBytes } from 'crypto'
import { getContentType } from 'mime-types'

/**
 * 💤 Pause execution for ms milliseconds
 */
export const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 🎲 Pick a random element from an array
 */
export const random = (arr = []) => arr[Math.floor(Math.random() * arr.length)]

/**
 * 🌐 Check if a string is a valid URL
 */
export const isUrl = (url = '') => {
  const regex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i
  return regex.test(url)
}

/**
 * 🧠 Format byte size to readable string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

/**
 * 📥 Download media from a URL to buffer
 */
export const downloadMedia = async (url) => {
  const res = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(res.data)
}

/**
 * 🧪 Write buffer to a temp file
 */
export const writeTemp = (buffer, ext = 'bin') => {
  const id = randomBytes(6).toString('hex')
  const filepath = join(tmpdir(), `ancore_${id}.${ext}`)
  writeFileSync(filepath, buffer)
  return filepath
}

/**
 * 🧹 Safe remove temp file
 */
export const safeUnlink = (path) => {
  try {
    unlinkSync(path)
  } catch {}
}

/**
 * 🧠 Detect mime type from buffer
 */
export const getMimeType = (buffer) => {
  const type = getContentType(buffer) || 'application/octet-stream'
  return type
  }
