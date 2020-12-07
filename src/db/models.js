const {db, sequelize} = require('./connections');
const datatypes = sequelize.DataTypes
//country, state, skills, courses, gender
// const State = db.define('states', {
//     name: {
//         type: datatypes.STRING(20)
//     }
// })
const Country = db.define('countries', {
    name: {
        type: datatypes.STRING(20),
        primaryKey: true,
        // autoIncrement: true
    }
})
const gender = db.define('genders',{
    name:{
        type: datatypes.STRING,
        primaryKey: true,
        // autoIncrement: true
    } 
    
})
const Skill = db.define('skills',{
    name:{
        type: datatypes.STRING,  
        primaryKey: true,
    } 
    // autoIncrement: true
})
const Course = db.define('courses', {
    name:{
        type: datatypes.STRING,  
        primaryKey: true,
    } 
    // autoIncrement: true
})

db.sync({ alter: true })
    .then (() => console.log("database synchronized"))
    .catch( (err) => console.log(err))

module.exports = {
    Country, gender, Skill, Course 
}
