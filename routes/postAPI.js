BlogPost = require('../models/blogpost')

exports = {};


exports.getPosts = function(req, res){
                        BlogPost.find({}).sort([['shortid', -1]]).exec(function (err, posts){
                        res.json({posts: posts});
                    });
};

exports.getPost = function(req, res){
                       BlogPost.find({shortid: req.params.shortid}).exec(function (err, post){
                            res.json({post: post});
                       });
};

exports.createPost = function(req, res){
                        req.body.date = new Date();
                        var newPost = new BlogPost(req.body);
                        newPost.save();
                        res.json({'success': 'Your post has been saved!'})
};

exports.deletePost = function(req, res){
                        shortid = req.params.shortid;
                        BlogPost.find({shortid: shortid}).remove().exec(function(err, post){
                            res.json({'success': 'Your post has been deleted'})
                        });
};

module.exports = exports;