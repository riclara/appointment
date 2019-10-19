import Joi from 'joi'

// common validations
const id = Joi.number().required()
const params = {
  year: Joi.string().required(),
  month: Joi.string().required(),
  day: Joi.string().required(),
  hour: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  description: Joi.string()
}

// schema for appointment
const appointmentSchema = Joi.object().keys(params)

const idSchema = Joi.object().keys({
  _id: id
})

export default {
  'get/appointment/:id': idSchema,
  'delete/appointment/:id': idSchema,
  'post/appointment': appointmentSchema,
  'put/appointment/:id': appointmentSchema
}
