(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('FeedController', function($scope, $route, SteamService) {

      console.log($scope.user);

      SteamService.getUserInfo().success(function(data){
        console.log('I am zee data', data);
        $scope.user = data[0];
      });

      SteamService.getMe().success(function (me) {
        console.log('this should be me: ',me);
        $scope.me = me
      })
      $scope.$route = $route;
      $scope.number = 5;
      $scope.getNumber = function(num) {
        return new Array(num);
      }
    })
})();
