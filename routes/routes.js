const postAPI = require('./postAPI');
      uploads = require('./uploads');
      login = require('./userAPI');

const templates = '../public/views'

module.exports = function(app){

    // Because we are using Jade any templates need to be rendered server side
    app.get('/template/:name', function(req, res) {
        var name = req.params.name;
        res.render(templates + '/' + name);
    });

    app.get('/', function(req, res){
        res.render(templates + '/base');
    });

    app.get('/viewpost/:shortid', function(req, res){
        res.render(templates + '/blogpost');
    });

    // The blog post api endpoints
    app.get('/post/:shortid', postAPI.post);
    app.delete('/post/:shortid', postAPI.deletePost);
    app.get('/post', postAPI.posts);
    app.post('/post', postAPI.createPost);


    app.post('/login', login.login);

    // Upload endpoint
    app.post('/upload', uploads.uploadFile.options, uploads.uploadFile.method);
}
