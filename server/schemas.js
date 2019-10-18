import Joi from 'joi'

// common validations
const id = Joi.number().required()

// schema for appointment
const appointmentSchemaCreate = Joi.object().keys({
  year: Joi.string().required(),
  month: Joi.string().required(),
  day: Joi.string().required(),
  hour: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  description: Joi.string().required()
})

const appointmentSchemaUpdate = Joi.object().keys({
  year: Joi.string(),
  month: Joi.string(),
  day: Joi.string(),
  hour: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  description: Joi.string()
})

const idSchema = Joi.object().keys({
  _id: id
})

export default {
  'get/appointment/:id': idSchema,
  'delete/appointment/:id': idSchema,
  'post/appointment': appointmentSchemaCreate,
  'put/appointment': appointmentSchemaUpdate
}
