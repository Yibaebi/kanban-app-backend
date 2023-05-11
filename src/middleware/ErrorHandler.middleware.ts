/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { RES_CODE_MAP } from '@constants'
import { logger } from '@utils'

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err)

  res.status(RES_CODE_MAP.INTERNAL_SERVER_ERROR).send(err)
}

export { errorHandler }
