BlogPost = require('../models/blogpost')

module.exports = {

     posts: function(req, res){
                BlogPost.find({}).sort([['shortid', -1]]).exec(function (err, posts){
                    res.json({posts: posts});
                });
            },

     post: function(req, res){
                BlogPost.find({shortid: req.shortid}).exec(function (err, post){
                    res.json({post: post});
                });
            },

     createPost: function(req, res){
                    req.body.date = new Date();
                    var newPost = new BlogPost(req.body);
                    newPost.save();
                    res.json({'success': 'Your post has been saved!'})
                 },

     deletePost: function(req, res){
                    shortid = req.params.shortid
                    BlogPost.find({shortid: shortid}).remove().exec(
                        res.json({'success': 'Your post has been deleted'})
                    )
     }

}
