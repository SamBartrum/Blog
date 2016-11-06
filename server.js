const express = require('express');
      bodyParser = require('body-parser');
      mongoose = require('mongoose');
      mongoose.Promise = require('bluebird');
      path = require('path');
      csrf = require('csurf');
      session = require('express-session');
      cookieParser = require('cookie-parser');
      MongoStore = require('connect-mongo')(session);
      config = require('./config');


// Some app setup
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.set('view engine', config.VIEW_ENGINE);


// Connect to the mongodDB - note app.settings.env defaults to development
mongoose.connect(config.DB_URL[app.settings.env])
const db = mongoose.connection;

// Set up the cookies and sessions
app.use(cookieParser());
app.use(session({
    secret: 'thisisonebigsecret',
    name: 'BlogCookie',
    store: new MongoStore({mongooseConnection: db}),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// CSRF protection
var csrfExemptURLS = ['/upload'];
var conditionalCSRF = function (req, res, next) {
  if(csrfExemptURLS.indexOf(req.path)==-1) {
    return csrf()(req, res, next);
  } else {
    return next();
  }
}
app.use(conditionalCSRF);
app.use(function(req, res, next){
    if(csrfExemptURLS.indexOf(req.path)==-1){
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.locals.csrftoken = req.csrfToken();
    }
    res.locals.session = req.session;
    next();
});

//Include the routes
require('./routes/routes')(app);

//Define the static directories
app.use(express.static(config.STATIC));

//Stuff we are importing - ship only what we need
const staticToServe = ['angular/', 'angular-resource/', 'angular-route/', 'jquery/dist/', 'font-awesome/', 'ng-file-upload/dist/'];
for(var i=0; i<staticToServe.length; i++){
    app.use('/static2', express.static(path.join(config.STATIC_IMPORTS, staticToServe[i])));
}
app.use('/static2', express.static(config.SEMANTIC));


var server = app.listen(config.SERVER_PORT, () => {
    console.log('listening on ' + config.SERVER_PORT)
})

module.exports = server;
