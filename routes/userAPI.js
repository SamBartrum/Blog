User = require('../models/users')

exports = {}

exports.login = function(req, res){
                    User.find({username: 'sam' , password: 'password' }).exec(function(err, user){
                        if(!user){
                            res.json({'message': 'Login details not recognised'});
                        }
                        else{
//                          TODO: sort out authentication here
                            console.log('greate')
                        }
                    });
                 };

exports.users = function(req, res){
                    User.find({}).exec(function(err, users){
                        res.json({users:users})
                    });
                };


module.exports = exports;