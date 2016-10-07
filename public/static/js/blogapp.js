var blogmodule = angular.module('blogmodule', []);

blogmodule.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

blogmodule.controller('TestController', ['$scope', function($scope) {
    console.log('hi');
    $scope.testMessage = "HIYA SAM!";
}]);

var x = 2;