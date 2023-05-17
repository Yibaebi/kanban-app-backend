import express, { Express } from 'express'
require('express-async-errors')

import { errorHandler } from '@middleware'
import { boards, tasks } from '@routes'

function startupRoutes(app: Express) {
  app.use(express.json())

  // Routes
  app.use('/api/boards', boards)
  app.use('/api/tasks', tasks)

  // Error handler
  app.use(errorHandler)
}

export { startupRoutes }
