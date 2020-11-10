const express = require('express');
const path = require('path')
const {Teacher, University, Country, State, gender, Skill, Course, db, sequelize} = require('./db/newmodels')
const app = express();

app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, '../views'))

app.get('/signupusers', (req, res)=>{
    const genders = gender.findAll()
    const skills = Skill.findAll()
    const countries = Country.findAll()
    res.render('signup', {
         skills, genders, countries 
    })
})

exports = module.exports =  {
    app
}