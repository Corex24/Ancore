// ✨ Ancore Text Tools | Style, Format, Fancyfy

import figlet from 'figlet'

/**
 * Convert text to ASCII banner using figlet
 * @param {string} text
 * @returns {Promise<string>}
 */
export function banner(text = 'Ancore') {
  return new Promise((resolve, reject) => {
    figlet.text(text, { font: 'Standard' }, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

/**
 * Change case of text
 * @param {string} text
 * @param {'upper'|'lower'|'title'} type
 */
export function transformCase(text, type = 'upper') {
  if (type === 'upper') return text.toUpperCase()
  if (type === 'lower') return text.toLowerCase()
  if (type === 'title')
    return text
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase())
  return text
}

/**
 * Basic symbol replacements (heart, tick, cross)
 */
export const symbols = {
  heart: '💙',
  tick: '✅',
  cross: '❌',
  wave: '👋',
  fire: '🔥',
  star: '⭐',
}
