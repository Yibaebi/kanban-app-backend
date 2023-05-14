import { Router } from 'express'

import { validateObjectID, validateReq } from '@middleware'
import {
  validateCreateBoard,
  validateCreateTask,
  validateUpdateBoardColumns
} from '@validators'
import * as boardController from '@controllers'

const router = Router()

// Get board
router.get('/:id', [validateObjectID], boardController.getABoard)

// Get all boards
router.get('/', boardController.getAllBoards)

// Create board
router.post(
  '/',
  [validateReq(validateCreateBoard)],
  boardController.createABoard
)

// Delete a board
router.delete('/:id', [validateObjectID], boardController.deleteABoard)

// Update a board columns
router.put(
  '/:id',
  [validateObjectID, validateReq(validateUpdateBoardColumns)],
  boardController.updateABoard
)

// Create a task
router.post(
  '/:id/tasks',
  [validateObjectID, validateReq(validateCreateTask)],
  boardController.createABoardTask
)

export { router as boards }
