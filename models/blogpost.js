var mongoose = require('mongoose');
var Counter = require('./counter');

// Create a schema for the blogposts
var BlogPostSchema = mongoose.Schema({
       blogtitle: String,
       blogpost: String,
       shortid: Number
    },
    {
     timestamps: true
    }
);

//Create a largely uneccessary index
BlogPostSchema.index({date: 1});


//Here we generate a unique shortid using the counters collection
BlogPostSchema.pre('save', function(next){
    var post = this;

    Counter.findByIdAndUpdate({_id: 'blogpostcount'}, {$inc: {seq: 1}}, {upsert:true, new:true})
        .exec(function(err, counter){
            console.log(counter);
            post.shortid = counter.seq;
            next();
        })
});


module.exports = mongoose.model('BlogPost', BlogPostSchema);