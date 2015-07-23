(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $route, SteamService) {
      $scope.$route = $route;
      $scope.number = 5;
      $scope.getNumber = function(num) {
        return new Array(num);
      }
    })
})();
