const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Some app setup
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'jade');

//Define the static directories
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//Include the routes
require('./routes')(app);

const PORT = 3000

// Connect to the mongodDB
mongoose.connect('mongodb://localhost:27017/Blog')
const db = mongoose.connection;


app.listen(3000, () => {
    console.log('listening on 3000')
})

