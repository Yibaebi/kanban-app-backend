import { Router } from 'express'

import { validateObjectID, validateReq } from '@middleware'
import { validateCreateBoard, validateUpdateBoard } from '@validators'
import { boardControllers } from '@controllers'

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

export { router as boards }
