(function () {
  'use strict';
  angular
    .module('account')
    .controller('AccountController', function($scope, $route, SteamService, _, $routeParams) {
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
        console.log('ME: ', me);
        $scope.me = me;
      })

      if($routeParams.steamId) {
        SteamService.getUserInfo().success(function(data){
          var routeSteamId = $routeParams.steamId;
          var foundUser = _.where(data, {steamId: routeSteamId});
          $scope.user = foundUser[0];
          $scope.games = foundUser[0].games;
          $scope.gamesList = _.sortBy(foundUser[0].games.games, 'name');
          console.log('USER:', $scope.user);
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
    })
})();
