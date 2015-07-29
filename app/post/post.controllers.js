(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $route, SteamService) {
      $scope.$route = $route;
      $scope.number = 15;
      $scope.getNumber = function(num) {
        return new Array(num);
      }

      SteamService.getMe().success(function(data){
        $scope.games = data.games
        console.log($scope.games.games);
      })

      $scope.selectGame = function($event) {
        console.log($event.currentTarget);
        var target = $event.currentTarget;
        $(target).siblings().removeClass('selectedGame');
        $(target).addClass('selectedGame');
      }
    })
})();
