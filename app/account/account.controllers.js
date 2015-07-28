(function () {
  'use strict';
  angular
    .module('account')
    .controller('AccountController', function($scope, $route, SteamService, _, $routeParams) {
      $scope.number = 15;
      $scope.getNumber = function(num) {
        return new Array(num);
      }

      // SteamService.getUserInfo().success(function(data){
      //   console.log(data);
      //   // $scope.user = data[0];
      // });

      SteamService.getMe().success(function (me) {
        console.log('this should be me: ', me);
        $scope.me = me
      })

      if($routeParams.steamId) {
        SteamService.getUserInfo().success(function(data){
          var routeSteamId = $routeParams.steamId;
          console.log(data);
          var foundUser = _.where(data, {steamId: routeSteamId});
          $scope.user = foundUser[0];
        });
      }

      $scope.navs = [
        {
          name: 'account',
          active: true
        },
        {
          name: 'library',
          active: false
        },
        {
          name: 'posts',
          active: false
        }
      ]

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
