var mongoose = require('mongoose');

// Create a schema for the blogposts
var BlogPostSchema = mongoose.Schema({
       blogtitle: String,
       date: Date,
       blogpost: String
});

//Create a largely uneccessary index
BlogPostSchema.index({date: 1});


module.exports = mongoose.model('BlogPost', BlogPostSchema);