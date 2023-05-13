import 'module-alias/register'
import express from 'express'
import { startupConfig, startupDb, startupRoutes } from '@start'
import { logger } from '@utils'

// Setup server
const app = express()

// Setup application config
startupConfig()

// Routes setup
startupRoutes(app)

// DB setup
startupDb()

// Setup port
const PORT = process.env.PORT || '3000'
const server = app.listen(PORT, () =>
  logger.info(`Listening on port ${PORT}...`)
)

export { server }
