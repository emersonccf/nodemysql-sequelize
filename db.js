const Sequelize = require('sequelize')
const bd = require('./env')
const sequelize = new Sequelize(bd.dataBDconnection.database, bd.dataBDconnection.user, bd.dataBDconnection.password, {
    dialect: bd.dataBDconnection.dialect,
    host: bd.dataBDconnection.host
})

module.exports = sequelize