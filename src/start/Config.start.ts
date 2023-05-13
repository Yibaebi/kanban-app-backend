import config from 'config'
import dotenv from 'dotenv'

dotenv.config()

const startupConfig = () => {
  const JWT_PRIVATE_KEY = config.get<string>('JWT_PRIVATE_KEY')

  if (!JWT_PRIVATE_KEY) {
    throw new Error('FATAL ERROR! "JWT_PRIVATE_KEY" not found.')
  }
}

export { startupConfig }
