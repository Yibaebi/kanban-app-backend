import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import { RES_CODE_MAP } from '@constants'

/**
 * Checks if requests to the board routes have valid taskIDs
 */
const validateTaskID = (req: Request, res: Response, next: NextFunction) => {
  const taskID = req.params.taskID
  const { BAD_REQUEST } = RES_CODE_MAP

  if (!taskID) {
    return res.status(BAD_REQUEST).send({
      data: null,
      message: 'Please provide a taskID.'
    })
  }

  const isValidID = mongoose.Types.ObjectId.isValid(taskID)

  if (!isValidID) {
    return res
      .status(BAD_REQUEST)
      .send({ data: null, message: 'Please provide a valid taskID.' })
  }

  next()
}

export { validateTaskID }
