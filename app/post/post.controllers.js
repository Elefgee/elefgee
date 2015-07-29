(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $rootScope, $route, SteamService, _) {
      $scope.$route = $route;

      SteamService.getMe().success(function(data){
        $scope.me = data;
        $scope.games = data.games
      })

      $scope.selectGame = function($event) {
        console.log($event.currentTarget);
        var target = $event.currentTarget;
        var targetId = $(target).data('id');
        $rootScope.selectedGame = _.where($scope.games.games, {appid: targetId});
        console.log('SELECTEDGAME', $rootScope.selectedGame[0]);
        $(target).siblings().removeClass('selectedGame');
        $(target).addClass('selectedGame');
      }
    })
})();
