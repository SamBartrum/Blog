const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Some app setup
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

//Include the routes
require('./routes')(app);

const PORT = 3000

// Connect to the mongodDB
mongoose.connect('mongodb://localhost:27017/Blog')
const db = mongoose.connection;


app.listen(3000, () => {
    console.log('listening on 3000')
})

