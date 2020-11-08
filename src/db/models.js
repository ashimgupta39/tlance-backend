const {db, sequelize} = require('./connections');
const datatypes = sequelize.DataTypes
//country, state, skills, courses, gender
const State = db.define('states', {
    name: {
        type: datatypes.STRING(20)
    }
})
const Country = db.define('countries', {
    name: {
        type: datatypes.STRING(20),
        primaryKey: true
    }
})
const gender = db.define('genders',{
    name: {
        type: datatypes.STRING
    }
})
const Skill = db.define('skills',{
    name: datatypes.STRING
})
const Course = db.define('courses', {
    name: datatypes.STRING
})

db.sync({ alter: true })
    .then (() => console.log("database synchronized"))
    .catch( (err) => console.log(err))

module.exports = {
    Country, State, gender, Skill, Course 
}
