User = require('../models/users')

exports = {}


exports.login = function(req, res){
                    User.findOne({username: req.body.username , password: req.body.password}).exec(function(err, user){
                        if(!user){
                            res.json({'message': 'Login details not recognised'});
                        }
                        else{
                            res.json({'message':'In you come'});
                        }
                    });
};

exports.users = function(req, res){
                    User.find({}).exec(function(err, users){
                        res.json({users:users});
                    });
};

exports.newUser = function(req, res){
                      var user = new User(req.body);
                      user.save();
                      res.json({'success': 'new user has been created'});
};

exports.getUser = function(req, res){
                    User.find({username: req.params.username}).exec(function (err, user){
                        res.json({user: user});
                    });
};

exports.deleteUser = function(req, res){
                        User.find({username: req.parmas.username}).remove().exec(function(err, post){
                            res.json({'success': 'User has been deleted'});
                        });
};


module.exports = exports;