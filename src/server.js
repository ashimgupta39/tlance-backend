const { urlencoded } = require('express');
const express = require('express');
const path = require('path')
const {Job, Teacher, University, Country, State, gender, Skill, Course, db, sequelize} = require('./db/newmodels')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//setting up websocket
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

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
        // res.send(`<h1>Login Successfull</h1>`)
        const courses = await Course.findAll()
        const jobs = await Job.findAll()
        res.render('tdpg',{
            details, courses, jobs
        })
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
//getting job details
app.get('/postajob', async(req,res)=>{
    const courses= await Course.findAll()
    res.render('postjobpg',{
        uname:req.query.uname,
        course: req.query.course,
        courses
    })
})
//entering job details in jobs table in db
app.post('/postjob', async(req,res)=>{
    await Job.create({
        UniversityName: req.body.UniversityName,
        location: req.body.location,
        forcourse: req.body.forcourse,
        stipend: req.body.stipend,
        jobdescription: req.body.jobdescription
    }).then(()=>{res.send(`<h2>Thank you for posting job</h2>`)})
      .catch((e)=>{console.error(e)})
})

//chatting system
app.get('/chat',(req,res)=>{
    res.render('chatpg',{
        from: req.query.from,
        to: req.query.to
    })
})

io.on('connection', (socket)=>{
    console.log('connected with socket id= ', socket.id)
    socket.on('logged_in',(data)=>{
        socket.join(data.from)
    })
    socket.on('msg_send',(data)=>{
        console.log("message:",data.msg,"sent from:",data.from, "to:", data.to)
        io.to(data.to).emit('msg_rcvd',data)
        socket.emit('msg_rcvd',data)
    })
})

exports = module.exports =  {
    server
}