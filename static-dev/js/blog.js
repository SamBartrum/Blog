var blogmodule = angular.module('blogmodule', []);

//Change the interpolation symbol to make it obviously distinct from any other template rendering
blogmodule.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

blogmodule.controller('newblogpostController', ['$scope', '$http', function($scope, $http) {

    this.newblogpost = '';
    this.newblogposttitle = '';

    this.savenewpost = function(){
         var data = $.param({json: JSON.stringify({blogtitle: this.newblogposttitle, blogpost: this.newblogpost})});
         console.log(data);
         $http.post("/savepost", data).success(function(data, status) {
            $('#successModal').modal('show');
        })
    };


}]);

