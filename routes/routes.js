const postAPI = require('./postAPI');
      uploads = require('./uploads');
      userAPI = require('./userAPI');

const templates = '../public/views'

module.exports = function(app){

    // The base path
    app.get('/', function(req, res){
        res.render(templates + '/base');
    });

    // Because we are using Jade any templates need to be rendered server side - use this endpoint for this
    // TODO: Handle template not existing. Search the directory first - maybe control the templates that can be sent back
    app.get('/template/:name', function(req, res) {
        var name = req.params.name;
        res.render(templates + '/' + name);
    });

    // The blog post api endpoints
    app.get('/post/:shortid', postAPI.getPost);
    app.delete('/post/:shortid', postAPI.deletePost);
    app.get('/post', postAPI.getPosts);
    app.post('/post', postAPI.createPost);


    // User api endpoints
    app.post('/login', userAPI.login);
    app.delete('/user/:username', userAPI.deleteUser);
    app.get('/user/:username', userAPI.getUser);
    app.post('/user', userAPI.newUser);
    app.get('/user', userAPI.users);


    // Upload endpoint
    app.post('/upload', uploads.uploadFile.options, uploads.uploadFile.method);
}
