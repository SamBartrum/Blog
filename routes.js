var BlogPost = require('./models/blogpost')

module.exports = function(app){

    app.get('/', function(req, res){
        res.render(__dirname + '/public/views/index', {params: {sam: 'I am sam'}});
    });

    app.post('/savepost', function(req, res){
        today = new Date('2014-01-22T14:56:59.301Z')
        req.body.date = today
        var newPerson = new BlogPost(req.body)
        newPerson.save()
        res.redirect('/')
    });

    app.get('/blogposts', function(req, res){
        BlogPost.find({}).sort([['date', -1]]).exec(function (err, posts){
            res.render(__dirname + '/public/views/blogposts', {params: {posts: posts}});
        })
    });

}
