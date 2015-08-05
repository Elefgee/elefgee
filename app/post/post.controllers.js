(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('PostController', function($scope, $window, $rootScope, $route, SteamService, PostService, _, $location) {
      var alreadySubmitted = false;
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
        $scope.post.displayName = data.displayName;
        var sortedGames = _.sortBy($scope.games.games, 'playtime_forever');
        $scope.games.games = sortedGames.reverse();
      })

      $scope.getUserById = function(steamIdArg) {
        SteamService.getUserInfo().success(function(allUsers){
          var certainUser = _.where(allUsers, {steamId: steamIdArg});
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
        $rootScope.$broadcast('game:selected');
      }

      $scope.addPost = function(postData) {
        alreadySubmitted = true;
        if (!postData.name || !postData.text) {
          $('#postErrorBlock').css('visibility', 'visible');
          if (!postData.name && !postData.text) {
            $('#postErrorGame').show();
            $('#postErrorDescription').show();
          } else if (postData.text && !postData.name) {
            $('#postErrorGame').show();
            $('#postErrorDescription').hide();
          } else if (postData.name && !postData.text) {
            $('#postErrorDescription').show();
            $('#postErrorGame').hide();
          }
        } else {
          postData.timestamp = new Date();
          SteamService.addPost(postData);
        }
      }

      $scope.checkForDescription = function() {
        var descriptionContent = $scope.post.text;
        if (descriptionContent.length > 0) {
          $rootScope.$broadcast('description:entered');
        } else {
          if (alreadySubmitted === true) {
            $('#postErrorBlock').css('visibility', 'visible');
          }
          $('#postErrorDescription').show();
        }
      }

      var gameHasBeenSelected = function() {
        $('#postErrorGame').hide();
        if ($('#postErrorGame').css('display') === 'none' && $('#postErrorDescription').css('display') === 'none') {
          $('#postErrorBlock').css('visibility', 'hidden');
        }
      }

      var descriptionHasBeenEntered = function() {
        var descriptionContent = $scope.post.text;

        if (alreadySubmitted === true) {
          if (descriptionContent.length === 0) {
            $('#postErrorBlock').css('visibility', 'visible');
            $('#postErrorDescription').show();
          } else {
            $('#postErrorDescription').hide();
            $('#postErrorBlock').css('visibility', 'hidden');
          }
        } else {
          if ($('#postErrorGame').css('display') === 'none' && $('#postErrorDescription').css('display') === 'none' && descriptionContent.length > 0) {
            $('#postErrorBlock').css('visibility', 'hidden');
          }
        }
      }

      $scope.$on('game:selected', gameHasBeenSelected);
      $scope.$on('description:entered', descriptionHasBeenEntered);
    })

})();
