(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $window, $rootScope, $route, SteamService, _, $location) {
      $scope.$route = $route;
      $rootScope.selectedGame = [{name: '-'}];
      $scope.post = {};

      SteamService.getMe().success(function(data){
        $scope.me = data;
        $scope.loggedIn = function(displayName) {
          if (displayName === undefined) {
            return $location.path('/BONK')
          }
          else if (displayName.length > 0) {
            return true;
          }
        }
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

      $scope.selectGame = function($event) {
        var target = $event.currentTarget;
        var targetId = $(target).data('id');
        var selectedGames = _.where($scope.games.games, {appid: targetId});
        $rootScope.selectedGame = _.where($scope.games.games, {appid: targetId});
        $scope.post.name = selectedGames[0].name;
        $scope.post.appid = selectedGames[0].appid;
        $scope.post.pictureLink = selectedGames[0].pictureLink;
        $(target).siblings().removeClass('selectedGame');
        $(target).addClass('selectedGame');
      }

      $scope.addPost = function(postData) {
        postData.timestamp = new Date();
        SteamService.addPost(postData);
        console.log($scope.post);
        $location.path('/feed');
        $window.scrollTo(0, 0);
      }

    })

})();
