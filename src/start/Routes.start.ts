import express, { Express } from 'express'
require('express-async-errors')

import { errorHandler } from '@middleware'
import { boards } from '@routes'

function startupRoutes(app: Express) {
  app.use(express.json())

  // Routes
  app.use('/api/boards', boards)

  // Error handler
  app.use(errorHandler)
}

export { startupRoutes }
