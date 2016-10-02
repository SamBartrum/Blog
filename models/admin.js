var mongoose = require('mongoose');

// Create a schema for the blogposts

var AdminSchema = mongoose.Schema({
    username: String,
    password: String,
    lastvisit: Date
});


module.export = mongoose.model('Admin', AdminSchema);