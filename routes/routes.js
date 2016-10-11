var BlogPost = require('../models/blogpost')
const multer = require('multer')
const postAPI = require('./postAPI');

const templates = '../public/views'


module.exports = function(app){

    app.get('/', function(req, res){
        res.render(templates + '/blogposts');
    });

    app.get('/admin', function(req, res){
        res.render(__dirname + '/public/views/admin', {params: {sam: 'I am sam'}});
    });

    app.get('/newpost', function(req, res){
        res.render(templates + '/newpost');
    });


    app.get('/post', postAPI.posts);
    app.get('/post/:shortid', postAPI.post);
    app.post('/post', postAPI.createPost);
    app.delete('/post/:shortid', postAPI.deletePost);



    // Media uploads

    var storage = multer.diskStorage(
       {
           destination: __dirname + '/public/static/uploads/',
           filename: function ( req, file, cb ) {
               cb( null, file.originalname );
           }
       });


    const uploading = multer({
        storage: storage,
    });

    app.post('/upload', uploading.single('media'), function(req, res, next){
        console.log(req.body) // form fields
        console.log(req.file) // form files
        res.status(204).end()
    });

}
