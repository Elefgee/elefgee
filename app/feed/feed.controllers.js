(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('FeedController', function($scope, $route, SteamService) {
      $scope.$route = $route;
      SteamService.getUserInfo().success(function(data){
        $scope.allPosts = [];
        _.each(data, function(el, idx, list) {
          _.each(data[idx].posts, function(el2, idx2) {
            $scope.allPosts.push(el2);
          })
        });
        console.log($scope.allPosts);
        $scope.user = data[0];
        console.log(data[0]);
      });

      SteamService.getMe().success(function (me) {
        $scope.me = me;
      })

      $scope.loggedIn = function(displayName) {
        if (displayName === undefined) {
          console.log('Log in!');
        }
        else if (displayName.length > 0) {
          return true;
        }
      }
    })
})();
