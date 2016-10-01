var mongoose = require('mongoose');

// Create a schema for the blogposts
module.exports = mongoose.model('BlogPost', {
       blogtitle: String,
       date: Date,
       blogpost: String
});
