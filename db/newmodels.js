const sequelize = require('sequelize')
const {Country, State, gender, Skill, Course} = require('./models')
const db = new sequelize('accounts', 'myuser','mypass',
{
    host: 'localhost',
    dialect: 'mysql'
})
const datatypes = sequelize.DataTypes

const Teacher = db.define('teachers', {
    id: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: datatypes.STRING(30),
        allowNull: false
    },
    username: {
        type: datatypes.STRING,
        allowNull: false,
    },
    emailId: {
        type: datatypes.STRING,
        allowNull: false,
        isEmail: true
    },
    Password: {
        type: datatypes.STRING(64),
        allowNull: false,
        is: /^[0-9a-f]{64}$/i
    },
    rating: {
        type: datatypes.FLOAT({
            max: 5,
            min: 0,
        }
        ),
    },
    address: {
        type: datatypes.STRING,
        allowNull: false
    },
    price: {
        type: datatypes.INTEGER({min:0}),
        allowNull: false
    },
    age: {
        type: datatypes.INTEGER({min: 1}),
        allowNull: false
    },
    // gender: {
    //     type: datatypes.STRING,
    //     allowNull: false
    // },
    mobileNo: {
        type: datatypes.INTEGER,
        allowNull: false
    }  
})

const University = db.define('universities', {
    id: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: datatypes.STRING,
        allowNull: false
    },

    emailId:{
        type: datatypes.STRING,
        allowNull: false,
        isEmail: true
    },
    Password: {
        type: datatypes.STRING(64),
        is: /^[0-9a-f]{64}$/i
    },
    courses: {
        type: datatypes.STRING,
        allowNull: false
    },
    mobileNo: {
        type: datatypes.INTEGER,
        allowNull: false
    },
    address: {
        type: datatypes.STRING,
        allowNull: false
    },
    preffered_qualities: {
        type: datatypes.STRING,
        allowNull: false
    }
})


db.sync({ alter: true })
    .then (() => console.log("database synchronized"))
    .catch( (err) => console.log(err))

module.exports = {
    Teacher, University, Country, State, gender, Skill, Course
}