const express = require('express');
const path = require('path')
const {Teacher, University, Country, State, gender, Skill, Course, db, sequelize} = require('./db/newmodels')
const app = express();

app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, '../views'))

app.get('/signup', (req, res)=>{
    res.render('signup')
})

exports = module.exports =  {
    app
}