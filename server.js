const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
var path = require('path');

//Some app setup
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', config.VIEW_ENGINE);

//Define the static directories
app.use(express.static(config.STATIC));

//Stuff we are importing - ship only what we need
app.use('/static2', express.static(path.join(config.STATIC_IMPORTS, 'angular/')));
app.use('/static2', express.static(path.join(config.STATIC_IMPORTS, 'jquery/dist/')));
app.use('/static2', express.static(config.SEMANTIC));

//Include the routes
require('./routes')(app);

// Connect to the mongodDB
mongoose.connect(config.DB_URL)
const db = mongoose.connection;


app.listen(config.SERVER_PORT, () => {
    console.log('listening on ' + config.SERVER_PORT)
})

