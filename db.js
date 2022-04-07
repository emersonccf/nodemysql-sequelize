const Sequelize = require('sequelize')
const db = require('./env')
const {
    database,
    user,
    password
} = db.databaseSettings
const sequelize = new Sequelize(database, user, password, db.databaseConnection)

module.exports = sequelize