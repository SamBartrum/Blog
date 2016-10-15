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

    that.selected = function(postid){
        that.selectedpost = postid;
        $('.deletePostModal').modal('show');
    };

    that.deletePost = function(){
        PostResource.delete({shortid: that.selectedpost}).$promise.then(function(data){
            that.getBlogPosts();
        });
    };


}]);


blogmodule.controller('newpostController', ['$scope', '$http', 'PostResource', function($scope, $http, PostResource) {

    var that = this;

    that.newblogpost = {blogtitle:'', blogpost:''};

    that.saveBlogPost = function(){
        var data = that.newblogpost;
        var savePost = new PostResource(data);
        savePost.$save(function(data) {
        });
        window.location.href = '/';
    };
}]);

blogmodule.controller('blogpostController', ['$scope', '$http', 'PostResource', function($scope, $http, PostResource) {

    var that = this;

    that.blogpost = {};

    that.getShortId = function(){
        var url = window.location.href;
        return url.split('/').pop();
    };

    that.getBlogPost = function(){
        var data = {shortid: that.getShortId()};
        PostResource.get(data).$promise.then(function(response){
            // TODO: return this an element not an array.
            returned = response.post[0]
            that.blogpost = returned;
        });
    };


}]);

blogmodule.filter('')


