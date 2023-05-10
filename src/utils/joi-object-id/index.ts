import Joi from 'joi'

const defaultMessage = 'valid mongo id'

const joiObjectID = (message = defaultMessage) =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)

export { joiObjectID }
