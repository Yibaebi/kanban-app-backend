import Joi from 'joi'

import { ISubTask, ICreateTask, IDeleteTask } from '@root/types'
import { joiObjectID } from '@utils'

// Validator fn adding tasks
export const validateCreateTask = (reqBody: ICreateTask, required = true) => {
  let schema = Joi.object<ICreateTask>({
    boardID: joiObjectID(),
    title: Joi.string()
      .required()
      .messages({
        'string.empty': 'title is not allowed to be empty.',
        'any.required': 'title is a required field.'
      })
      .max(255),
    description: Joi.string()
      .required()
      .messages({
        'string.empty': 'description is not allowed to be empty.',
        'any.required': 'description is a required field.'
      })
      .max(255),
    status: Joi.string()
      .required()
      .messages({
        'string.empty': 'status is not allowed to be empty.',
        'any.required': 'status is a required field.'
      })
      .max(15),
    subtasks: Joi.array<ISubTask>().required().min(1).max(10)
  })

  schema = required ? schema.options({ presence: 'required' }) : schema

  return schema.validate(reqBody)
}

// Validator fn adding tasks
export const validateDeleteTask = (reqBody: IDeleteTask, required = true) => {
  let schema = Joi.object<IDeleteTask>({
    boardID: joiObjectID()
  })

  schema = required ? schema.options({ presence: 'required' }) : schema

  return schema.validate(reqBody)
}
