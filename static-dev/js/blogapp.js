var blogmodule = angular.module('blogmodule', ['ngResource', 'ngRoute']);

//Change the interpolation symbol to make it obviously distinct from any other template rendering
blogmodule.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});


//Create a resource for the blog posts which can get injected into controllers
blogmodule.factory('PostResource', ['$resource', function($resource) {
    return $resource('/post/:shortid', null);
}]);

blogmodule.factory('LoginResource', ['$resource', function($resource){
    return $resource('/login');
}]);

blogmodule.factory('UserResource', ['$resource', function($resource){
    return $resource('/user/:id', null);
}]);

blogmodule.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : '/template/blogposts.jade',
                controller  : 'blogpostsController',
                controllerAs: 'bpsCtrl'
            })

            .when('/blogpost/:postid', {
                templateUrl: '/template/blogpost.jade',
                controller: 'blogpostController',
                controllerAs: 'bpCtrl'
            })

            .when('/newpost', {
                templateUrl: '/template/newpost.jade',
                controller: 'newpostController',
                controllerAs: 'npCtrl'
            })

            .when('/users', {
                templateUrl: '/template/users.jade',
                controller: 'usersController',
                controllerAs: 'uCtrl'
            })

            // route for the about page
            .when('/login', {
                templateUrl : 'login.html',
                controller  : 'loginController',
                controllerAs: 'lCtrl'
            })
    });


