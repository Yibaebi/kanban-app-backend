import mongoose from 'mongoose'
import config from 'config'
import { logger } from '@utils'

const startupDb = () => {
  // DB Host uri
  const DB_HOST = config.get<string>('DB_HOST')

  mongoose
    .connect(DB_HOST)
    .then(() => logger.info(`Connected to ${DB_HOST}...`))
}

export { startupDb }
