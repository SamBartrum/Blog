var blogmodule = angular.module('blogmodule', []);

blogmodule.controller('TestController', ['$scope', function($scope) {
    console.log('hi');
    $scope.testMessage = "WHAT'S UP MARK";
}]);