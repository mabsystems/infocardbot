const Sequelize = require("sequelize")
require('dotenv').config()

const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        useUTC: false,
        timezone: 'Etc/GMT-5'
    }

})

module.exports = sequelize
