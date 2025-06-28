require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  SESSION_ID: process.env.SESSION_ID || 'ANCORE_DEFAULT',
  PORT: process.env.PORT || 8080,
  RENDER_API_KEY: process.env.RENDER_API_KEY || '',
  TIMEZONE: process.env.TIMEZONE || 'Africa/Lagos'
}
