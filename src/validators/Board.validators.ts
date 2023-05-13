import Joi from 'joi'

import { IBoardSubTask, ICreateBoard, ICreateTask } from '@root/types'

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

// Validator fn adding tasks
const validateCreateTask = (reqBody: ICreateTask, required = true) => {
  let schema = Joi.object<ICreateTask>({
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
    subtasks: Joi.array<IBoardSubTask>().required().min(1).max(10)
  })

  schema = required ? schema.options({ presence: 'required' }) : schema

  return schema.validate(reqBody)
}

export { validateCreateBoard, validateCreateTask }
