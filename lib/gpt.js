// 📁 lib/gpt.js
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Send a chat message to OpenAI GPT-4 and get a response.
 * @param {string} prompt The user prompt.
 * @param {string} model The OpenAI model to use (default: gpt-4).
 * @param {number} maxTokens Max tokens in the response.
 * @returns {Promise<string>} The AI generated reply.
 */
export async function askGPT(prompt, model = 'gpt-4', maxTokens = 500) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set in environment variables.')
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  }

  const data = {
    model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxTokens,
    temperature: 0.7,
  }

  try {
    const response = await axios.post(OPENAI_API_URL, data, { headers })
    return response.data.choices[0].message.content.trim()
  } catch (error) {
    throw new Error(`OpenAI request failed: ${error.response?.data?.error?.message || error.message}`)
  }
}
