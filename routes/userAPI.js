const User = require('../models/users');
      bcrypt = require('bcrypt');
      config = require('../config');

exports = {}


exports.login = function(req, res){
                    User.findOne({username: req.body.username}).exec(function(err, user){
                        if(user){
                            if(bcrypt.compareSync(req.body.password, user.password)){
                                req.session.user = {username: user.username, admin: user.admin};
                                res.json({success: true});
                            }
                            else{
                                res.json({success: false, password: false});
                            }
                        }
                        else{
                            res.json({success: false, user: false});
                        }
                    });
};

// Logout - reset session and redirect to home page
exports.logout = function(req, res){
                    req.session.destroy();
                    res.redirect('/');
};

exports.getUsers = function(req, res){
                    User.find({}).sort([['username', 1]]).exec(function(err, users){
                        res.json({users:users});
                    });
};

exports.newUser = function(req, res){
                      var userdata = req.body;
                      var hash = bcrypt.hashSync(userdata.password, config.SALT_ROUNDS);
                      userdata.password = hash;
                      var user = new User(userdata);
                      user.save();
                      res.json({'success': 'new user has been created'});
};

exports.getUser = function(req, res){
                    User.find({username: req.params.username}).exec(function (err, user){
                        res.json({user: user});
                    });
};

exports.deleteUser = function(req, res){
                        User.find({_id: req.params.id}).remove().exec(function(err, post){
                            res.json({'success': 'User has been deleted'});
                        });
};


module.exports = exports;