import { Router } from 'express'

import { validateObjectID, validateReq } from '@middleware'
import { validateCreateBoard, validateUpdateBoard } from '@validators'
import * as controllers from '@controllers'

const router = Router()

// Get board
router.get('/:id', [validateObjectID], controllers.getABoard)

// Get all boards
router.get('/', controllers.getAllBoards)

// Create board
router.post('/', [validateReq(validateCreateBoard)], controllers.createABoard)

// Delete a board
router.delete('/:id', [validateObjectID], controllers.deleteABoard)

// Update a board
router.put(
  '/:id',
  [validateObjectID, validateReq(validateUpdateBoard)],
  controllers.updateABoard
)

export { router as boards }
