const sequelize = require('sequelize')
const db = new sequelize('accounts', 'myuser','mypass',
{
    host: 'localhost',
    dialect: 'mysql'
})

const Teacher = db.define('teachers', {
    id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: sequelize.STRING,
        allowNull: false
    },
    emailId:{
        type: sequelize.STRING,
        allowNull: false,
        isEmail: true
    },
    Password: {
        type: sequelize.STRING(64),
        is: /^[0-9a-f]{64}$/i
    },
    skills: {
        type: sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: sequelize.FLOAT({
            max: 5,
            min: 0,
        }
        ),
    },
    address: {
        type: sequelize.STRING,
        allowNull: false
    },
    country: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    price: {
        type: sequelize.INTEGER({min:0}),
        allowNull: false
    },
    age: {
        type: sequelize.NUMBER({min: 1}),
        allowNull: false
    },
    gender: {
        type: sequelize.STRING,
        allowNull: false
    },
    mobileNo: {
        type: sequelize.NUMBER,
        allowNull: false
    }
})

const University = db.define('universities', {
    id:{
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: sequelize.STRING,
        allowNull: false
    },
    emailId:{
        type: sequelize.STRING,
        allowNull: false,
        isEmail: true
    },
    Password: {
        type: sequelize.STRING(64),
        is: /^[0-9a-f]{64}$/i
    },
    courses: {
        type: sequelize.STRING,
        allowNull: false
    },
    mobileNo: {
        type: sequelize.NUMBER,
        allowNull: false
    },
    address: {
        type: sequelize.STRING,
        allowNull: false
    },
    country: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    preffered_qualities: {
        type: sequelize.STRING,
        allowNull: false
    }
})

db.sync()
    .then(()=> console.log("db synced"))
    .catch((e)=>console.error(e))

exports = module.exports = {
    University, Teacher
}