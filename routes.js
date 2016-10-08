var BlogPost = require('./models/blogpost')

module.exports = function(app){

//    Main entrance page - has snippets of all the previous blog posts on
    app.get('/', function(req, res){
        BlogPost.find({}).sort([['date', -1]]).exec(function (err, posts){
            res.render(__dirname + '/public/views/blogposts', {params: {posts: posts}});
        })
    });



    app.get('/admin', function(req, res){
        res.render(__dirname + '/public/views/admin', {params: {sam: 'I am sam'}});
    });

    app.get('/post/:id', function(req, res){
        BlogPost.findOne({_id: req.params.id}).exec(function (err, post){
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
    });

    app.post('/updatepost/:id', function(req, res){
        BlogPost.update({_id: req.param.id},
                        {blogtitle: req.params.blogtitle, blogpost: req.params.blogpost})
    });

    app.get('/deletepost/:id', function(req, res){
        BlogPost.remove({_id: req.params.id}, function(err){
            res.redirect('/')
        })
    });

}
