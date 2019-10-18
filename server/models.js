import Sequelize from 'sequelize'

const sequelize = new Sequelize(`sqlite:${process.env.NODE_ENV}.db`)

class Appointment extends Sequelize.Model {}

Appointment.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false
  },
  day: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hour: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'appointment',
  indexes: [
    {
      unique: true,
      fields: ['year', 'month', 'day', 'hour']
    }
  ]
})

export const sync = () => {
  return sequelize.sync({ force: process.env.NODE_ENV === 'test' }).then(() => {

  })
}

export const appointment = Appointment
