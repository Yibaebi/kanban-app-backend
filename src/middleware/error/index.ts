import { Request, Response } from 'express'

import { logger } from '../logger'
import { RES_CODE_MAP } from '../../constants'

const error = (err: Error, _: Request, res: Response) => {
  logger.error(err)
  res.status(RES_CODE_MAP.INTERNAL_SERVER_ERROR).send(err)
}

export { error }
