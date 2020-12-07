const express = require('express');
const path = require('path')
const {Teacher, University, Country, State, gender, Skill, Course, db, sequelize} = require('./db/newmodels')
const app = express();

app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, '../views'))

app.get('/signupteachers', async(req, res)=>{
    const skills = await Skill.findAll()
    const countries = await Country.findAll()
    const genderes = await gender.findAll()
    res.render('signup', {
         skills, genderes, countries 
    })
})
app.get('/signupuniversities', async(req, res)=>{
    const courses = await Course.findAll()
    const countries = await Country.findAll()
    // const genderes = await gender.findAll()
    res.render('signupuni', {
         courses, countries 
    })
})

exports = module.exports =  {
    app
}