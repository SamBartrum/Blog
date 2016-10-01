var mongoose = require('mongoose');

// Create a schema for the blogposts
module.exports = mongoose.model('Admin', {
       username: String,
       password: String,
       lastvisit: Date
});
