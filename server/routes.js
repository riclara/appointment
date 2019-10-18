import express from 'express'
import Validator from './validator'
import { appointment } from './models'

const validateRequest = Validator(true)
const router = express.Router()

// for test purpose
router.get('/', validateRequest, (request, response) => {
  response.status(200).end()
})

router.get('/appointment/:id', validateRequest, (request, response) => {
  appointment.findByPk(request.params.id).then(appointment => {
    response.json(appointment)
  }).catch(reason => response.status(500).json({error: reason.message}))
})

router.get('/appointments/date/:date', (request, response) => {
  const dateSplit = request.params.date.split('-')
  appointment.findAll({
    where: {
      year: dateSplit[0],
      month: dateSplit[1],
      day: dateSplit[2]
    }
  }).then(appointments => {
    response.json(appointments)
  }).catch(reason => response.status(500).json({error: reason.message}))
})

router.post('/appointment', validateRequest, (request, response) => {
  appointment.create(request.body)
    .then(appointment => {
      response.json(appointment)
    })
    .catch(reason => response.status(500).json({error: reason.message}))
})

router.put('/appointment/:id', validateRequest, (request, response) => {
  appointment.findByPk(request.params.id)
    .then(appointment => appointment.update(request.body))
    .then(appointment => {
      response.json(appointment)
    })
    .catch(reason => response.status(500).json({error: reason.message}))
})

router.delete('/appointment/:id', validateRequest, (request, response) => {
  appointment.findByPk(request.params.id)
    .then(appointment => appointment.destroy())
    .then(res => response.json(res))
    .catch(reason => response.status(500).json({error: reason.message}))
})

export default router
