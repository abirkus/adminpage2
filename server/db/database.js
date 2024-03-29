const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const dbUrl =
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`
const db = new Sequelize(dbUrl, { logging: false, native: true })

module.exports = db

// if (process.env.NODE_ENV === 'test') {
// 	after('close database connection', () => db.close())
// }
