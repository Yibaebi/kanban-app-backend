import Joi from 'joi'

import { ISubTask, ICreateTask } from '@root/types'
import { ReqValidatorFn } from '@middleware'

// Validator fn adding and updating tasks
export const validateTask: ReqValidatorFn<ICreateTask> = (
  reqBody,
  required = true
) => {
  let schema = Joi.object<ICreateTask>({
    title: Joi.string()
      .messages({
        'string.empty': 'title is not allowed to be empty.',
        'any.required': 'title is a required field.'
      })
      .max(255),
    description: Joi.string()
      .messages({
        'string.empty': 'description is not allowed to be empty.',
        'any.required': 'description is a required field.'
      })
      .max(255),
    status: Joi.string()
      .messages({
        'string.empty': 'status is not allowed to be empty.',
        'any.required': 'status is a required field.'
      })
      .max(15),
    subtasks: Joi.array<ISubTask>().min(1).max(10)
  })

  schema = required ? schema.options({ presence: 'required' }) : schema

  return schema.validate(reqBody)
}
