(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('FeedController', function($scope, $route, SteamService) {

      console.log($scope.user);

      SteamService.getUserInfo().success(function(data){
        console.log(data);
        $scope.user = data[0];
      });


      $scope.$route = $route;
      $scope.number = 5;
      $scope.getNumber = function(num) {
        return new Array(num);
      }
    })
})();
