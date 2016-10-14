var mongoose = require('mongoose');

// Create a schema for the blogposts

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    lastvisit: Date,
    admin: {type: Boolean, default: false}
});

// Why the hell not
UserSchema.index({username: 1});

module.exports = mongoose.model('User', UserSchema);