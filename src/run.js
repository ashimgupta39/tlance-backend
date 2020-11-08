const db = require('./db/newmodels')
const {app} = require('./server')

app.listen(3131, ()=>{
    console.log("server started at http://localhost:3131")
})

db.sync()
    .then(()=>{console.log("synced")})
    .catch((e)=>{console.log(e)})