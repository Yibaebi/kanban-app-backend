import { Router } from 'express'

import { validateObjectID, validateReq, validateTaskID } from '@middleware'
import { boardControllers, taskControllers } from '@controllers'
import {
  validateCreateBoard,
  validateTask,
  validateUpdateBoard
} from '@validators'

const router = Router()

// Get board
router.get('/:id', [validateObjectID], boardControllers.getABoard)

// Get all boards
router.get('/', boardControllers.getAllBoards)

// Create board
router.post(
  '/',
  [validateReq(validateCreateBoard)],
  boardControllers.createABoard
)

// Delete a board
router.delete('/:id', [validateObjectID], boardControllers.deleteABoard)

// Update a board
router.put(
  '/:id',
  [validateObjectID, validateReq(validateUpdateBoard)],
  boardControllers.updateABoard
)

// Delete a task
router.delete(
  '/:id/tasks/:taskID',
  [validateTaskID],
  taskControllers.deleteABoardTask
)

// Create a task
router.post(
  '/:id/tasks',
  [validateObjectID, validateReq(validateTask)],
  taskControllers.createABoardTask
)

// Update a task
router.put(
  '/:id/tasks/:taskID',
  [validateObjectID, validateReq(validateTask, false)],
  taskControllers.updateABoardTask
)

export { router as boards }
