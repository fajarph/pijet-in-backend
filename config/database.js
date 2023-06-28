const { Sequelize } = require("sequelize")

const db = new Sequelize('db_pijetin','postgres','27fajar03',{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = db;