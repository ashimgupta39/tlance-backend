const express = require('express');
const path = require('path')

const app = express();

app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, '../views'))

exports = module.exports =  {
    app
}