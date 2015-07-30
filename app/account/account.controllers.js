(function () {
  'use strict';
  angular
    .module('account')
    .controller('AccountController', function($scope, $route, SteamService, _, $routeParams, $location) {
      $scope.navs = [
        {
          name: 'library',
          active: true
        },
        {
          name: 'posts',
          active: false
        }
      ]

      SteamService.getMe().success(function (me) {
        $scope.me = me;
      })

      if($routeParams.steamId) {
        SteamService.getUserInfo().success(function(data){
          var routeSteamId = $routeParams.steamId;
          var foundUser = _.where(data, {steamId: routeSteamId});
          $scope.user = foundUser[0];
          $scope.games = foundUser[0].games;
          $scope.posts = foundUser[0].posts;
          $scope.gamesList = _.sortBy(foundUser[0].games.games, 'name');
        });
      }

      $scope.accountNavClick = function(clicked) {
        _.each($scope.navs, function(el){
          el.active = false;
        });
       var clickedBtn = _.findWhere($scope.navs, {name: clicked});
       clickedBtn.active = true;

       return clickedBtn.active;
      }

      $scope.isTrue = function(clicked) {
        var nameBtn = _.findWhere($scope.navs, {name: clicked})
        return nameBtn.active;
      }

      $scope.loggedIn = function(meName) {
        if (meName === undefined) {
          $location.path('/BONK')
        }
        else if (meName.length > 0) {
          return true;
        }
      }
    })
})();
