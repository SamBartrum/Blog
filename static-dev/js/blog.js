var blogmodule = angular.module('blogmodule', ['ngResource']);

//Change the interpolation symbol to make it obviously distinct from any other template rendering
blogmodule.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});


//Create a resource for the blog posts which can get injected into controllers
blogmodule.factory('PostResource', ['$resource', function($resource) {
    return $resource('/post/:shortid', null);
}]);


blogmodule.controller('blogpostsController', ['$scope', '$http', 'PostResource', function($scope, $http, PostResource) {

    var that = this;

    $scope.blogposts = [];
    that.selectedpost = null;

    that.getBlogPosts = function(){
        PostResource.get().$promise.then(function(data) {
            $scope.blogposts = data.posts;
        });
    };

    that.deletePost = function(id){
        PostResource.delete({shortid: id}).$promise.then(function(data){
            that.getBlogPosts();
        });
    };

    that.getPost = function(id){
        PostResource.get({shortid: id}).$promise.then(function(data){
            console.log(data);
        });
    };


}]);


blogmodule.controller('newpostController', ['$scope', '$http', 'PostResource', function($scope, $http, PostResource) {

    var that = this;

    that.newblogpost = '';
    that.newblogtitle = '';

    that.saveBlogPost = function(){
        var data = {blogtitle: that.newblogtitle, blogpost: that.newblogpost};
        var savePost = new PostResource(data);
        savePost.$save(function(data) {
            console.log(data)
        });
    };
}]);




