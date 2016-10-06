var BlogPost = require('./models/blogpost')

module.exports = function(app){

    app.get('/admin', function(req, res){
        res.render(__dirname + '/public/views/admin', {params: {sam: 'I am sam'}});
    });

    app.post('/savepost', function(req, res){
        today = new Date()
        req.body.date = today
        var newPerson = new BlogPost(req.body)
        newPerson.save()
        res.redirect('/')
    });

    app.get('/', function(req, res){
        BlogPost.find({}).sort([['date', -1]]).exec(function (err, posts){
            res.render(__dirname + '/public/views/index', {params: {posts: posts}});
        })
    });

    app.get('/deletepost/:id', function(req, res){
        BlogPost.remove({_id: req.params.id}, function(err){
            res.redirect('/')
        })
    });

}
