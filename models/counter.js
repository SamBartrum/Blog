var mongoose = require('mongoose');

// Create a schema for counter collection
// This gives us a short id for each blog post and thus we won't have to expose the mongo id in the urls
var CounterSchema = mongoose.Schema({
       _id: {type: String, required: true},
       seq: {type: Number, default: 0}
});

module.exports = mongoose.model('Counter', CounterSchema);