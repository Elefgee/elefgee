(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('FeedController', function($scope, $route, SteamService) {
      $scope.$route = $route;
      $scope.number = 5;
      $scope.getNumber = function(num) {
        return new Array(num);   
      }
    })
})();
