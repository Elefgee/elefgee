(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $rootScope, $route, SteamService, _) {
      $scope.$route = $route;

      $scope.post = {};

      SteamService.getMe().success(function(data){
        $scope.me = data;
        $scope.games = data.games
        $scope.post.userData = data;
      })

      $scope.selectGame = function($event) {
        console.log($event.currentTarget);
        var target = $event.currentTarget;
        var targetId = $(target).data('id');
        var selectedGames = _.where($scope.games.games, {appid: targetId});
        $rootScope.selectedGame = _.where($scope.games.games, {appid: targetId});
        $scope.post.name = selectedGames[0].name;
        $scope.post.appid = selectedGames[0].appid;
        $(target).siblings().removeClass('selectedGame');
        $(target).addClass('selectedGame');
      }

      $scope.addPost = function(postData) {
        SteamService.addPost(postData)
      }
    })

})();
