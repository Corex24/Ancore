// 🕸️ Ancore Scraper Utils | Web Parsers & API Wrappers
import axios from 'axios'
import cheerio from 'cheerio'

/**
 * Fetch raw HTML from a URL
 * @param {string} url
 * @returns {Promise<string>}
 */
export async function fetchHTML(url) {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (AncoreBot)',
    },
  })
  return data
}

/**
 * Load Cheerio ($) from a URL
 * @param {string} url
 * @returns {Promise<CheerioStatic>}
 */
export async function loadCheerio(url) {
  const html = await fetchHTML(url)
  return cheerio.load(html)
}

/**
 * Get the <title> of any webpage
 * @param {string} url
 * @returns {Promise<string>}
 */
export async function getTitle(url) {
  const $ = await loadCheerio(url)
  return $('title').text().trim()
}

/**
 * Extract all links from a page
 * @param {string} url
 * @returns {Promise<string[]>}
 */
export async function extractLinks(url) {
  const $ = await loadCheerio(url)
  return $('a')
    .map((_, el) => $(el).attr('href'))
    .get()
    .filter(Boolean)
}

/**
 * Extract image sources from a page
 * @param {string} url
 * @returns {Promise<string[]>}
 */
export async function extractImages(url) {
  const $ = await loadCheerio(url)
  return $('img')
    .map((_, el) => $(el).attr('src'))
    .get()
    .filter(Boolean)
}
