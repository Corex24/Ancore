require('dotenv').config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  RENDER_API_KEY: process.env.RENDER_API_KEY,
  SESSION_ID: process.env.SESSION_ID,
  PORT: process.env.PORT,
  RENDER_NAME: process.env.RENDER_NAME,
};

module.exports = config;
