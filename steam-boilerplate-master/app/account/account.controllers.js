(function () {
  'use strict';
  angular
    .module('account')
    .controller('AccountController', function($scope, $route, SteamService, _) {
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
