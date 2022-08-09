const Sequelize = require('sequelize')
const db = require('../database')
var axios = require('axios')
const Driver = require('./driver')
const Customer = require('./customer')
const moment = require('moment')

const Order = db.define('order', {
  hash: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'booked new'
  },
  customerComments: {
    type: Sequelize.TEXT
  },
  pickupDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    },
    allowNull: true
  },
  dropoffDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    },
    allowNull: true
  },
  pickupLocation: {
    type: Sequelize.STRING
  },
  carYear: {
    type: Sequelize.INTEGER
  },
  carMake: {
    type: Sequelize.STRING
  },
  carModel: {
    type: Sequelize.STRING
  },
  carColor: {
    type: Sequelize.STRING
  },
  vin: {
    type: Sequelize.STRING,
    allowNull: true
  },
  promoCode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  discount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true
  },
  isInCalendar: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  stickShift: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  flexibleOnTime: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
