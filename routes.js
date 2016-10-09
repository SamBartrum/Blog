var BlogPost = require('./models/blogpost')
const multer = require('multer')

module.exports = function(app){

//    Main entrance page - has snippets of all the previous blog posts on
    app.get('/', function(req, res){
        BlogPost.find({}).sort([['updatedAt', -1]]).exec(function (err, posts){
            res.render(__dirname + '/public/views/blogposts', {params: {posts: posts}});
        })
    });

    app.get('/admin', function(req, res){
        res.render(__dirname + '/public/views/admin', {params: {sam: 'I am sam'}});
    });

    app.get('/post/:shortid', function(req, res){
        BlogPost.findOne({shortid: req.params.shortid}).exec(function (err, post){
            res.render(__dirname + '/public/views/blogpost', {params: {post: post}});
        })
    });

    app.get('/newpost', function(req,res){
         res.render(__dirname + '/public/views/newpost');
    });

    app.post('/savepost', function(req, res){
        today = new Date()
        req.body.date = today
        var newPost = new BlogPost(req.body)
        newPost.save()
        res.redirect('/')
    });

    app.post('/updatepost/:shortid', function(req, res){
        BlogPost.update({shortid: req.param.shortid},
                        {blogtitle: req.params.blogtitle, blogpost: req.params.blogpost})
    });

    app.get('/deletepost/:shortid', function(req, res){
        BlogPost.remove({shortid: req.params.shortid}, function(err){
            res.redirect('/')
        })
    });

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
    })

    app.post('/upload', uploading.single('media'), function(req, res, next){
        res.status(204).end()
    });

}
