import { Router } from 'express'

import { taskControllers } from '@controllers'
import { validateBoardID, validateReq } from '@middleware'
import { validateCreateTask, validateDeleteTask } from '@validators'

const router = Router()

// Create a task
router.post(
  '/',
  [validateBoardID, validateReq(validateCreateTask)],
  taskControllers.createABoardTask
)

// Delete a task
router.delete(
  '/:id',
  [validateBoardID, validateReq(validateDeleteTask)],
  taskControllers.deleteABoardTask
)

export { router as tasks }
