const postAPI = require('./postAPI');
      uploads = require('./uploads');
      userAPI = require('./userAPI');

const templates = '../public/views'

// Check whether user is loged in or not - protect the endpoints
function requireLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};


module.exports = function(app){

    // The base path
    app.get('/', function(req, res){
        res.render(templates + '/base');
    });

    // Because we are using Jade any templates need to be rendered server side - use this endpoint for this
    // TODO: Handle template not existing. Search the directory first - maybe control the templates that can be sent back
    app.get('/template/:name', function(req, res) {
        var name = req.params.name;
        res.render(templates + '/pages/' + name);
    });

    // The blog post api endpoints
    app.get('/post/:shortid', postAPI.getPost);
    app.delete('/post/:shortid', requireLogin, postAPI.deletePost);
    app.get('/post', postAPI.getPosts);
    app.post('/post', requireLogin, postAPI.createPost);


    // User api endpoints
    app.post('/login', userAPI.login);
    app.get('/logout', userAPI.logout);
    app.delete('/user/:id', requireLogin, userAPI.deleteUser);
    app.get('/user/:username', requireLogin, userAPI.getUser);
    app.post('/user', requireLogin, userAPI.newUser);
    app.get('/user', requireLogin, userAPI.getUsers);


    // Upload endpoint
    app.post('/upload', uploads.uploadFile.options, uploads.uploadFile.method);
}
