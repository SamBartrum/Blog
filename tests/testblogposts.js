process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server');
var BlogPost = require('../models/blogpost')

var should = chai.should();
chai.use(chaiHttp);


describe('EndPoints', function() {

  BlogPost.collection.drop();

  // Set up some hooks
  beforeEach(function(done){
    var newBlogPost = new BlogPost({
       blogtitle: 'THIS IS THE TITLE',
       blogpost: 'SOME CONTENT GOES HERE',
       date: new Date()
    });
    newBlogPost.save(function(err) {
      done();
    });
  });

  afterEach(function(done){
    BlogPost.collection.drop();
    done();
  });

  it('testing the /posts endpoint - should return all blog posts', function(done){
    chai.request(server)
    .get('/posts')
    .end(function(err, res){
        res.should.have.status(200);
        done();
    });
  });

  it('testing the /savepost - should save a blog post', function(done){
    chai.request(server)
    .post('/savepost')
    .send({'blogtitle': 'test title', 'blogpost': 'THIS IS SOME TEST CONTENT'})
    .end(function(err, res){
        res.should.have.status(200);
        done();
    });
  });

});