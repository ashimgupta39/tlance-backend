const sequelize = require('sequelize')
const {Country, State, gender, Skill, Course} = require('./models')
const db = new sequelize('accounts', 'myuser','mypass',
{
    host: 'localhost',
    dialect: 'mysql'
})
const datatypes = sequelize.DataTypes

//Jobs Model
const Job = db.define('jobs', {
    UniversityName:{
        type: datatypes.STRING,
        allowNull: false
    },
    location:{
        type: datatypes.STRING,
        allowNull: false
    },
    forcourse:{
        type: datatypes.STRING,
        allowNull: false
    },
    stipend: {
        type: datatypes.INTEGER({min:0}),
        allowNull: false
    },
    jobdescription: {
        type: datatypes.STRING(1000),
        allowNull: false
    }
})

const Teacher = db.define('teachers', {
    // tid: {
    //     type: datatypes.INTEGER,
    //     // primaryKey: true,
    //     //  autoIncrement: true
    // },
    name: {
        type: datatypes.STRING(300),
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
    price: {
        type: datatypes.INTEGER({min:0}),
        allowNull: false
    },
    // mobileNo: {
    //     type: datatypes.INTEGER(4294967295),
    //     allowNull: false
    // },
    pitch: {
        type: datatypes.STRING(1000),
        allowNull: false
    }  
})

const University = db.define('universities', {
    // uid: {
    //     type: datatypes.INTEGER,
    //     // primaryKey: true,
    //     // autoIncrement: true
    // },
    username:{
        type: datatypes.STRING,
        allowNull: false
    },
    name: {
        type: datatypes.STRING(300),
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
    // mobileNo: {
    //     type: datatypes.INTEGER(4294967295),
    //     allowNull: false
    // },
    preffered_qualities: {
        type: datatypes.STRING,
        allowNull: false
    }
})

University.belongsTo(Course)
Course.hasMany(University)

Teacher.belongsTo(Skill)
Skill.hasMany(Teacher)

Teacher.belongsTo(gender)
gender.hasMany(Teacher)



db.sync({ alter: true })
    .then (() => console.log("database synchronized"))
    .catch( (err) => console.log(err))

module.exports = {
    Job, Teacher, University, Country, State, gender, Skill, Course,db, sequelize
}