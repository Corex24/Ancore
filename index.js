import { startClient } from './lib/client.js'
import { logger } from './lib/logger.js'
import { connectDatabase } from './lib/database.js'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  logger.info('💙 Ancore MD Booting Up...')
  try {
    await connectDatabase()
    await startClient()
  } catch (e) {
    logger.error('❌ Startup failed:', e)
    process.exit(1)
  }
}

main()
