// Set up the app with some default data
//Run node setup in the command line. Unfortunately once it has printed out to stdout we have to kill this process.
//Need a better way of handling the asynchronisity to prevent the mongo connection from being killed before we have inserted

const randomName = require('node-random-name');
      loremIpsum = require('lorem-ipsum');
      BlogPosts = require('./models/blogpost');
      User = require('./models/users');
      mongoose = require('mongoose');
      mongoose.Promise = require('bluebird');
      config = require('./config');
      bcrypt = require('bcrypt');

// Connect to the mongodDB
mongoose.connect(config.DB_URL.development)

var inserted = 0;

// Generate some users
var genUsers = function(num){
                    for(var i=0; i<num; i++){
                        password = bcrypt.hashSync(Math.random().toString(36).substring(7), config.SALT_ROUNDS);
                        var user = new User({username: randomName() , password:  password});
                        user.save(function(err){
                            if(err){
                                console.log(err);
                            }
                            else{
                                inserted += 1;
                                console.log('user inserted');
                            }
                        });
                    };
                }


// Generate some Blog Posts
var genPosts = function(num){
                    for(var i = 0; i<num; i++){
                        var title = loremIpsum({count: 4, units: 'words'});
                        var post = loremIpsum({count:4, units: 'paragraphs', paragraphLowerBound:3})
                        var blogpost = new BlogPosts({blogtitle: title  , blogpost: post });
                        blogpost.save(function(err){
                            if(err){
                                console.log(err);
                            }
                            else{
                                inserted += 1,
                                console.log('blogpost inserted');
                            }
                        }
                        );

                    }
                }


const usercount = 10;
const postcount = 10;

genUsers(usercount);
genPosts(postcount);

// Stick a default user in with known password
password = bcrypt.hashSync('123', config.SALT_ROUNDS);
var me = new User({username: 'sam', password: password})
me.save()
