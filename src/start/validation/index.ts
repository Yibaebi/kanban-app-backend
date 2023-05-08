import Joi from 'joi'

const defaultMessage = 'valid mongo id'

function joiObjectId(message?: string) {
  if (message == undefined) {
    message = defaultMessage
  }

  return function objectId() {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)
  }
}

const startupValidation = () => {
  Joi.objectId = joiObjectId
}

export { startupValidation }
