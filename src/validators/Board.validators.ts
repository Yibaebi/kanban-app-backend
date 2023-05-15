import Joi from 'joi'

import { ICreateBoard } from '@root/types'

// Validator fn for creating a board
const validateCreateBoard = (reqBody: ICreateBoard, required = true) => {
  let schema = Joi.object<ICreateBoard>({
    name: Joi.string()
      .required()
      .messages({
        'string.empty': 'name is not allowed to be empty.',
        'any.required': 'name is a required field.'
      })
      .min(3)
      .max(255),
    columns: Joi.array<string>().required().min(0).max(10)
  })

  schema = required ? schema.options({ presence: 'required' }) : schema

  return schema.validate(reqBody)
}

// Validator fn updating a board
const validateUpdateBoard = (reqBody: Partial<ICreateBoard>) => {
  const schema = Joi.object({
    name: Joi.string().messages({
      'string.empty': 'name is not allowed to be empty.',
      'any.required': 'name is a required field.'
    }),
    columns: Joi.array<string>().min(1).max(10)
  })

  return schema.validate(reqBody)
}

export { validateCreateBoard, validateUpdateBoard }
