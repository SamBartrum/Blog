const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

//Some app setup
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', config.VIEW_ENGINE);

//Define the static directories
app.use(express.static(config.STATIC));
app.use(express.static(config.STATIC_IMPORTS));

//Include the routes
require('./routes')(app);

// Connect to the mongodDB
mongoose.connect(config.DB_URL)
const db = mongoose.connection;


app.listen(config.SERVER_PORT, () => {
    console.log('listening on ' + config.SERVER_PORT)
})

