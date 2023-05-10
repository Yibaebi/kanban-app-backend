import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'

import { RES_CODE_MAP } from '../../constants'

const validateObjectID = (req: Request, res: Response, next: NextFunction) => {
  const isValidID = mongoose.Types.ObjectId.isValid(req.params.id)

  if (!isValidID) {
    return res
      .status(RES_CODE_MAP.NOT_FOUND)
      .send({ data: null, message: 'Invalid request ID' })
  }

  next()
}

export { validateObjectID }
