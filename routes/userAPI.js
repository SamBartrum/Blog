const User = require('../models/users');
      bcrypt = require('bcrypt');
      saltRounds = 10;

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
                        userData = [];
                        for(i=0; i<users.length; i++){
                            userData.push({username: users[i].username, admin: users[i].admin});
                        }
                        res.json({users:userData});
                    });
};

exports.newUser = function(req, res){
                      var userdata = req.body;
                      var hash = bcrypt.hashSync(userdata.password, saltRounds);
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
                        User.find({username: req.parmas.username}).remove().exec(function(err, post){
                            res.json({'success': 'User has been deleted'});
                        });
};


module.exports = exports;