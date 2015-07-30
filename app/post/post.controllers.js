(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $window, $rootScope, $route, SteamService, _, $location) {
      $scope.$route = $route;
      $rootScope.selectedGame = [{name: '-'}];
      $scope.post = {};

      SteamService.getMe().success(function (me) {
        $scope.me = me;
        $scope.games = me.games;
        $scope.post.userData = me;
        var sortedGames = _.sortBy($scope.games.games, 'playtime_forever');
        $scope.games.games = sortedGames.reverse();
      });

      $scope.getUserById = function(steamIdArg) {
        SteamService.getUserInfo().success(function(allUsers){
          console.log('ALL USERS', allUsers);
          var certainUser = _.where(allUsers, {steamId: steamIdArg});
          console.log(certainUser);
          return certainUser;
        })
      }

      $scope.selectGame = function($event) {
        var target = $event.currentTarget;
        var targetId = $(target).data('id');
        var selectedGames = _.where($scope.games.games, {appid: targetId});
        console.log(selectedGames);
        $rootScope.selectedGame = _.where($scope.games.games, {appid: targetId});
        $scope.post.name = selectedGames[0].name;
        $scope.post.appid = selectedGames[0].appid;
        $(target).siblings().removeClass('selectedGame');
        $(target).addClass('selectedGame');
      }

      $scope.addPost = function(postData) {
        console.log(postData);
        postData.timestamp = new Date();
        SteamService.addPost(postData);
        $location.path('/feed');
        $window.scrollTo(0, 0);
      }
    })

})();
