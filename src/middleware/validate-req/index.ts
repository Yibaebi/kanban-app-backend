import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import { RES_CODE_MAP } from '../../constants'

/**
 * @type {(reqBody: unknown) => Joi.ValidationResult<string>}
 */
export type ReqValidatorFn = (reqBody: unknown) => Joi.ValidationResult

/**
 * Validate the request body with a custom error
 *
 * @param {ReqValidatorFn} validatorFn
 */
const validateReq =
  (validatorFn: ReqValidatorFn) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = validatorFn(req.body)

    if (error) {
      const { BAD_REQUEST: status } = RES_CODE_MAP

      const message = error.details[0].message.replaceAll('"', '')
      const responseData = { status, message, data: null }

      return res.status(status).send(responseData)
    }

    next()
  }

export { validateReq }
