var BlogPost = require('../models/blogpost')
const postAPI = require('./postAPI');
const uploads = require('./uploads');

const templates = '../public/views'


module.exports = function(app){

    app.get('/', function(req, res){
        res.render(templates + '/blogposts');
    });

    app.get('/admin', function(req, res){
        res.render(templates + '/admin');
    });

    app.get('/newpost', function(req, res){
        res.render(templates + '/newpost');
    });

    app.get('/viewpost/:shortid', function(req, res){
        res.render(templates + '/blogpost');
    });

    // The blog post api endpoints
    app.get('/post/:shortid', postAPI.post);
    app.delete('/post/:shortid', postAPI.deletePost);
    app.get('/post', postAPI.posts);
    app.post('/post', postAPI.createPost);

    // Upload endpoint
    app.post('/upload', uploads.uploadFile.options, uploads.uploadFile.method);
}
