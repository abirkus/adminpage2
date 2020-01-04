const Sequelize = require('sequelize')
const {db} = require('../database')
var axios = require('axios')
const Customer = require('./customer')

const Order = db.define('order', {
	hash: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	pickupDate: {
		type: Sequelize.DATE,
		validate: {
			isDate: true,
		},
	},
	dropoffDate: {
		type: Sequelize.DATE,
		validate: {
			isDate: true,
		},
	},
	pickupLocation: {
		type: Sequelize.STRING,
	},
	carYear: {
		type: Sequelize.INTEGER,
	},
	carMake: {
		type: Sequelize.STRING,
	},
	carModel: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
		values: [
			'received',
			'waiting on quote',
			'quote approved - getting serviced',
			'completed - pending invoice',
			'completed - invoice sent',
			'completed - paid',
		],
		defaultValue: 'received',
	},
	comments: {
		type: Sequelize.TEXT,
	},
	isInCalendar: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
})

Order.beforeCreate((inst, options) => {
	let newinst = {...inst.dataValues}
	console.log('new instance', newinst)
	return Customer.findOne({
		where: {phoneNumber: newinst.customerPhoneNumber},
	}).then(cus => {
		inst.isInCalendar = true
		newinst.customerName = `${cus.firstName} ${cus.lastName}`
		console.log('order instance after finding the customer', newinst)
		axios.post(
			'http://localhost:1337/auth/google/calendar/newevent',
			newinst
		)
	})
})

Order.afterUpdate((inst, options) => {
	let newinst = {...inst.dataValues}
	console.log('updating instance', newinst)
	return axios
		.post(
			'http://localhost:1337/auth/google/calendar/newevent/update',
			newinst
		)
		.then(res => console.log('successfully update in Calendar'))
})

module.exports = Order
