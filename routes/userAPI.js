User = require('../models/users')

exports = {}


exports.login = function(req, res){
                    User.findOne({username: req.body.username , password: req.body.password}).exec(function(err, user){
                        if(!user){
                            res.json({success: false});
                        }
                        else{
                            req.session.user = {username: user.username, admin: user.admin};
                            res.json({success: true});
                        }
                    });
};

// Logout - reset session and redirect to home page
exports.logout = function(req, res){
                    req.session.destroy();
                    res.redirect('/');
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