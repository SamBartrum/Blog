var path = require('path');

module.exports = {

    DB_URL: {development: 'mongodb://localhost:27017/Blog',
             test: 'mongodb://localhost:27017/Blog-test'},

    SERVER_PORT: 3000,


    VIEW_ENGINE: 'jade',

    STATIC: path.join(__dirname, 'public'),
    STATIC_IMPORTS: path.join(__dirname, 'node_modules'),
    SEMANTIC: path.join(__dirname, 'semantic/dist'),

    SALT_ROUNDS: 10

}