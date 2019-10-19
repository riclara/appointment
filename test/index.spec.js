process.env.NODE_ENV = 'test'

import app from '../server/app'
import request from 'supertest'

beforeAll(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 4000);
  })
})

afterAll((done) => {
  app.close()
  setTimeout(() => {
    done()
  }, 3000);
})

test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done()
    })
})

describe('Appointments tests', () => {

  test('It should create the first appointment', (done) => {
    request(app).post('/appointment')
    .send({
      year: "2019",
      month: "09",
      day: "10",
      hour: "11",
      name: "John Doe",
      email: "jdoe@email.com",
      description: "some description"
    })
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body.id).not.toBeNull()
      done()
    })
  })

  test('It revoke create the second appointment', (done) => {
    request(app).post('/appointment')
    .send({
      name: "",
    })
    .then((response) => {
      expect(response.statusCode).toBe(422)
      done()
    })
  })

  test('It should update an appointment', (done) => {
    request(app).put('/appointment/1')
    .send({
        year: "2019",
        month: "09",
        day: "10",
        hour: "11",
        name: "Jack Doe",
        email: "jdoe@email.com",
        description: "some description"
    })
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toEqual('Jack Doe')
      done()
    })
  })

  test('It revoke update a second appointment', (done) => {
    request(app).put('/appointment/1')
    .send({
      name: "",
    })
    .then((response) => {
      expect(response.statusCode).toBe(422)
      done()
    })
  })

  test('It should retrieve an appointment', (done) => {
    request(app).get('/appointment/1')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body.id).not.toBeNull()
        expect(response.body.id).toEqual(1)
        expect(response.body.email).toEqual('jdoe@email.com')
        done()
    })
  })

  test('It should retrieve all appointments by date', (done) => {
    request(app).get('/appointments/date/2019-09-10')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).not.toBeNull()
        expect(response.body[0].id).toEqual(1)
        expect(response.body[0].email).toEqual('jdoe@email.com')
        done()
    })
  })

  test('It should delete the appointment', (done) => {
    request(app).delete('/appointment/1')
    .then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
