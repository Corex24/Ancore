//━━━━━━━━━━━━━━━━━━━[ 🌐 ANCORE GLOBAL SETTINGS ]━━━━━━━━━━━━━━━━━━━//
// 🔧 Author: Corex | 💙 Project: https://github.com/Corex24/Ancore
// ✨ Environment & Global Config Loader | Required by index.js
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const configPath = path.join(__dirname, './config.env');
const databasePath = path.join(__dirname, './database.db');
if (fs.existsSync(configPath)) require('dotenv').config({ path: configPath });

const toBool = (x) => x === 'true';

const DATABASE_URL =
  process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
  VERSION: require('./package.json').version,

  // 🧠 SESSION & PREFIX
  SESSION_ID: (process.env.SESSION_ID || 'ANCORE_SESSION').trim(),
  PREFIX: (process.env.PREFIX || '.').trim(),

  // 👑 OWNER & ACCESS
  SUDO: process.env.SUDO || '2348036869669',
  OWNER_NAME: process.env.OWNER_NAME || 'Corex',
  OWNER_NUMBER: process.env.OWNER_NUMBER || '2348036869669',

  // 💬 STICKERS & INFO
  STICKER_PACKNAME: process.env.STICKER_PACKNAME || '💙°CoReX°💙',
  STICKER_AUTHOR: process.env.STICKER_AUTHOR_NAME || 'Corex',
  WATERMARK: process.env.GL_WM || '© Ancore',
  BOT_LANG: process.env.BOT_LANG || 'english',

  // 🧱 DATABASE
  DATABASE:
    DATABASE_URL === databasePath
      ? new Sequelize({
          dialect: 'sqlite',
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: 'postgres',
          ssl: true,
          protocol: 'postgres',
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),

  // ⚙️ DEPLOYMENT OPTIONS
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  BRANCH: 'master',
  VPS: toBool(process.env.VPS),
  RENDER_NAME: (process.env.RENDER_NAME || '').trim(),
  RENDER_API_KEY: (process.env.RENDER_API_KEY || '').trim(),

  // 🚀 BEHAVIOUR TOGGLES
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE,
  LOG_MSG: process.env.LOG_MSG || 'false',
  AUTO_UPDATE: process.env.AUTO_UPDATE || 'true',
  DISABLE_START_MESSAGE: process.env.DISABLE_START_MESSAGE || 'false',
  CMD_REACTION: process.env.CMD_REACTION || 'true',
  SEND_READ: process.env.SEND_READ,
  AUTO_STATUS_VIEW: (process.env.AUTO_STATUS_VIEW || 'false').trim(),

  // 🧠 AI & GPT OPTIONS
  GPT: (process.env.GPT || 'free').trim(),
  MODEL: (process.env.MODEL || 'gpt-3.5-turbo').trim(),
  BRAINSHOP: process.env.BRAINSHOP || '159501,6pq8dPiYt7PdqHz3',
  GEMINI_API_KEY: (process.env.GEMINI_API_KEY || '').trim(),

  // 🧪 EXPERIMENTAL
  TRUECALLER: process.env.TRUECALLER,
  WHITE_LIST: process.env.WHITE_LIST || '',
  YT_COOKIE: process.env.YT_COOKIE,
  BING_COOKIE: process.env.BING_COOKIE || '',
  RMBG_KEY: process.env.RMBG_KEY || 'null',

  // 🧾 GROUP MODERATION
  WARN_LIMIT: process.env.WARN_LIMIT || 3,
  ANTI_DELETE: (process.env.ANTI_DELETE || 'null').trim(),
  ANTI_BOT: (process.env.ANTI_BOT || 'off').trim(),
  ANTI_BOT_MESSAGE: process.env.ANTI_BOT_MESSAGE || '&mention removed',
  ANTILINK_MSG: process.env.ANTILINK_MSG || '_Antilink Detected &mention kicked_',
  ANTISPAM_MSG: process.env.ANTISPAM_MSG || '_Antispam Detected &mention kicked_',
  ANTIWORDS_MSG: process.env.ANTIWORDS_MSG || '_AntiWord Detected &mention kicked_',
  ANTIWORDS: process.env.ANTIWORDS || 'word',

  // 🛠 WARN SYSTEM
  WARN_MESSAGE:
    process.env.WARN_MESSAGE ||
    '⚠️ WARNING ⚠️\n*User :* &mention\n*Warn :* &warn\n*Remaining :* &remaining',
  WARN_RESET_MESSAGE:
    process.env.WARN_RESET_MESSAGE ||
    '♻️ WARN RESET\nUser : &mention\nRemaining : &remaining',
  WARN_KICK_MESSAGE: process.env.WARN_KICK_MESSAGE || '&mention kicked',

  // 🔗 LINKS + FOOTERS
  PLINK: process.env.PLINK || 'https://github.com/Corex24/Ancore',
  PERSONAL_MESSAGE: (process.env.PERSONAL_MESSAGE || 'null').trim(),

  // ⏱ MISC
  MAX_UPLOAD: process.env.MAX_UPLOAD || 230,
  DELETE_TYPE: (process.env.DELETE_TYPE || '').trim(),
  LIST_TYPE: (process.env.LIST_TYPE || 'text').trim(),
  APPROVE: (process.env.APPROVE || '').trim(),
  MENTION: process.env.MENTION || '',
  TIMEZONE: process.env.TIMEZONE || 'Africa/Lagos',
  FORCE_LOGOUT: process.env.FORCE_LOGOUT || 'false',
  DISABLE_BOT: process.env.DISABLE_BOT || 'null',
}
