import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import { RES_CODE_MAP } from '@constants'

/**
 * Checks if requests to columns and tasks routes have valid boardIDs
 */
const validateBoardID = (req: Request, res: Response, next: NextFunction) => {
  const boardID = req.body.boardID as string
  const { BAD_REQUEST } = RES_CODE_MAP

  if (!boardID) {
    return res.status(BAD_REQUEST).send({
      data: null,
      message: 'Please provide a boardID.'
    })
  }

  const isValidID = mongoose.Types.ObjectId.isValid(String(boardID))

  if (!isValidID) {
    return res
      .status(BAD_REQUEST)
      .send({ data: null, message: 'Please provide a valid boardID.' })
  }

  next()
}

export { validateBoardID }
