(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('FeedController', function($scope, $route, SteamService) {

      SteamService.getUserInfo().success(function(data){
        $scope.user = data[0];
      });

      SteamService.getMe().success(function (me) {
        $scope.me = me
      })
      $scope.$route = $route;
      $scope.number = 5;
      $scope.getNumber = function(num) {
        return new Array(num);
      }
    })
})();
