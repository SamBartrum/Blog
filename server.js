const express = require('express')
const bodyParser= require('body-parser')
var mongoose = require('mongoose')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'jade');

var PORT = 3000

// Connect to the mongodDB
mongoose.connect('mongodb://localhost:27017/Blog')
var db = mongoose.connection;

// Create a schema for the blogposts
var BlogPost = mongoose.model('BlogPost', {blogtitle: String, date: Date, blogpost: String });


app.listen(3000, () => {
    console.log('listening on 3000')
})

// Basic response using ES6 syntax
app.get('/', (req, res) => {
  res.render(__dirname + '/index')
})

app.post('/savepost', (req, res) => {
  today = new Date('2014-01-22T14:56:59.301Z')
  req.body.date = today
  var newPerson = new BlogPost(req.body)
  newPerson.save()
  res.redirect('/')
})

