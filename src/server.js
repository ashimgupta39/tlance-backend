const { urlencoded } = require('express');
const express = require('express');
const path = require('path')
const {Teacher, University, Country, State, gender, Skill, Course, db, sequelize} = require('./db/newmodels')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//landing page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/landingpg.html')
})
//setting view engine to hbs for rendering things on webpage
app.set('view engine', 'hbs')
app.set('views', __dirname+ '/views')
//making helpers for hbs
var Handlebars = require('hbs')
Handlebars.registerHelper('isEqual', function (value, cname) {
    return value == cname;
  });
Handlebars.registerHelper('fieldcheck', function (value, cname) {
    return value == cname;
  });
//the line that solves addressing problems
app.use(express.static(path.join(__dirname, 'views')))

//signup page requests
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

//login page requests
app.get('/loginpgteachers',(req,res)=>{
    res.sendFile(__dirname + '/views/login.html')
})
app.get('/loginpguni',(req,res)=>{
    res.sendFile(__dirname + '/views/loginuni.html')
})

//storing teachers and universities details in database while signing them up
app.post('/signteachers', async(req,res)=>{
    await Teacher.create({
        name: req.body.Name,
        username: req.body.username,
        emailId: req.body.email,
        mobileNo: req.body.phoneno,
        country: req.body.country,
        Password: req.body.passwd,
        genderName: req.body.gender,
        skillName: req.body.skills,
        price: req.body.price,
        pitch: req.body.pitch
    }).then(()=>{res.sendFile(__dirname + '/views/login.html')})
      .catch((e)=>{console.log(e)})
    
})
app.post('/signuniversities', async(req,res)=>{
    await University.create({
        name: req.body.Name,
        username: req.body.username,
        emailId: req.body.email,
        Password: req.body.passwd,
        mobileNo: req.body.phoneno,
        country: req.body.country,
        courseName: req.body.course,
        preffered_qualities: req.body.lookingfor
    }).then(()=>{res.sendFile(__dirname + '/views/loginuni.html')})
      .catch((e)=>{console.log(e)})
    
})

//Login System
app.post('/loginteachers',async(req,res)=>{
    let details=await Teacher.findOne({
        where:{
            emailId: req.body.email,
            Password: req.body.passwd
        }
    })
    if(details){
        res.send(`<h1>Login Successfull</h1>`)
    }
    else{
        res.send(`<h1>Login unsuccessfull</h1>`)
    }
})
app.post('/loginuniversities',async(req,res)=>{
    let details= await University.findOne({
        where:{
            emailId: req.body.email,
            Password: req.body.passwd
        }
    }) 
    if(details){
        // res.send(`<h1>Login Successfull</h1>`)
        
        const teachers= await Teacher.findAll()
        const courses= await Course.findAll()
        res.render('udpg',{
            details, teachers, courses
        })
    }
    else{
        res.send(`<h1>Login unsuccessfull</h1>`)
    }
})

exports = module.exports =  {
    app
}