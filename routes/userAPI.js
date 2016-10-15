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
                        res.json({users:users})
                    });
                };


module.exports = exports;