const {db} = require('./db/newmodels')
const {server} = require('./server')

server.listen(3131, ()=>{
    console.log("server started at http://localhost:3131")
})

db.sync( {alter:true} )
    .then(()=>{console.log("synced")})
    .catch((e)=>{console.log(e)})