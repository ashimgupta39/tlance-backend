const express = require('express');
const app = express();

const path = require('path')
path.use('/', express.static(path.join(__dirname, 'public')))

app.listen(4444, ()=>{
    console.log('started');
})

exports = module.exports =  {
    app
}