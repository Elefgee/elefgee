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

      SteamService.getUserInfo().success(function(data){
        console.log(data);
        $scope.user = data[0];
      });

      SteamService.getMe().success(function (me) {
        console.log('this should be me: ',me);
        $scope.me = me
      })

      $scope.selectGame = function($event) {
        console.log($event.currentTarget);
        var target = $event.currentTarget;
        $(target).siblings().removeClass('selectedGame');
        $(target).addClass('selectedGame');
      }
    })
})();
