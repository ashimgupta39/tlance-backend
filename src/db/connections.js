const sequelize = require('sequelize')
const db = new sequelize('accounts', 'myuser','mypass',
{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    db, sequelize
}