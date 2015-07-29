(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $rootScope, $route, SteamService, _) {
      $scope.$route = $route;
      $rootScope.selectedGame = [{name: '-'}];
      $scope.post = {};

      SteamService.getMe().success(function(data){
        $scope.me = data;
        $scope.games = data.games;
        $scope.post.userData = data;
        var sortedGames = _.sortBy($scope.games.games, 'playtime_forever');
        $scope.games.games = sortedGames.reverse();
      })

      $scope.getUserById = function(steamIdArg) {
        SteamService.getUserInfo().success(function(allUsers){
          console.log('ALL USERS', allUsers);
          var certainUser = _.where(allUsers, {steamId: steamIdArg});
          console.log(certainUser);
          return certainUser;
        })
      }

      $scope.addPost = function(postData) {
        SteamService.addPost(postData);
      }

      $scope.selectGame = function($event) {
        var target = $event.currentTarget;
        var targetId = $(target).data('id');
        var selectedGames = _.where($scope.games.games, {appid: targetId});
        $rootScope.selectedGame = _.where($scope.games.games, {appid: targetId});
        $scope.post.name = selectedGames[0].name;
        $scope.post.appid = selectedGames[0].appid;
        $(target).siblings().removeClass('selectedGame');
        $(target).addClass('selectedGame');
      }
    })
})();
