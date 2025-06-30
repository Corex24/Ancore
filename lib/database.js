import { Sequelize } from 'sequelize'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const databasePath = path.resolve('./database.db')
const DATABASE_URL = process.env.DATABASE_URL || databasePath

export const sequelize = DATABASE_URL === databasePath
  ? new Sequelize({ dialect: 'sqlite', storage: DATABASE_URL, logging: false })
  : new Sequelize(DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
      },
      logging: false
    })

export async function connectDatabase() {
  try {
    await sequelize.authenticate()
    console.log('📦 Database connected!')
  } catch (err) {
    console.error('❌ Failed to connect DB:', err.message)
    process.exit(1)
  }
      }
