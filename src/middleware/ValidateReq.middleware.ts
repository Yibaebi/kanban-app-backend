import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import { RES_CODE_MAP } from '@constants'

/**
 * @type {(reqBody: unknown) => Joi.ValidationResult<string>}
 */
export type ReqValidatorFn<T> = (
  reqBody: T,
  required?: boolean
) => Joi.ValidationResult<T>

/**
 * Validate the request body with a custom error
 *
 * @param {ReqValidatorFn} validatorFn
 * @param {boolean} required
 */
const validateReq =
  <T>(validatorFn: ReqValidatorFn<T>, required = true) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = validatorFn(req.body, required)

    if (error) {
      const { BAD_REQUEST } = RES_CODE_MAP
      const message = error.details[0].message.replaceAll('"', '')

      return res.status(BAD_REQUEST).send({ message, data: null })
    }

    next()
  }

export { validateReq }
