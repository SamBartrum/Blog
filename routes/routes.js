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

    // The blog post api endpoints
    app.get('/post', postAPI.posts);
    app.get('/post/:shortid', postAPI.post);
    app.post('/post', postAPI.createPost);
    app.delete('/post/:shortid', postAPI.deletePost);

    // Upload endpoint
    app.post('/upload', uploads.uploadFile.options, uploads.uploadFile.method);
}
