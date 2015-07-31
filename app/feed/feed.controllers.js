(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('FeedController', function($scope, $route, SteamService, $location) {
      $scope.navs = [
        {
          name: 'all',
          active: true
        },
        {
          name: 'owned',
          active: false
        }
      ]

      $scope.isTrue = function(clicked) {
        var nameBtn = _.findWhere($scope.navs, {name: clicked})
        return nameBtn.active;
      }

      $scope.feedNavClick = function(clicked) {
        _.each($scope.navs, function(el){
          el.active = false;
        });
       var clickedBtn = _.findWhere($scope.navs, {name: clicked});
       clickedBtn.active = true;

       return clickedBtn.active;
      }

      $scope.$route = $route;
      SteamService.getUserInfo().success(function(data){
        console.log(data);
        $scope.allPosts = [];
        _.each(data, function(el, idx, list) {
          _.each(data[idx].posts, function(el2, idx2) {
            $scope.allPosts.push(el2);
          })
        });
        $scope.user = data[0];
      });

      SteamService.getMe().success(function (me) {
        $scope.me = me;
        console.log(me);
        $scope.loggedIn = function(displayName) {
          if (displayName === undefined) {
            console.log('Log in!');
            $location.path('/BONK')
          }
          else if (displayName.length > 0) {
            return true;
          }
        }
      })

      SteamService.getMe().success(function(me){

        var me = me;

        SteamService.getUserInfo().success(function(allUsers) {

          var allPosts = [];
          _.each(allUsers, function(el, idx, list) {
            _.each(allUsers[idx].posts, function(el2, idx2) {
              allPosts.push(el2);
            })
          });

          console.log(allPosts);

          var ownedGameNames = [];
          var myOwnedPosts = [];
          _.each(me.games.games, function(el){
            ownedGameNames.push(el.name);
          })

          _.each(allPosts, function(el){
            for(var i = 0; i < ownedGameNames.length; i++) {
              if (ownedGameNames[i] === el.name) {
                myOwnedPosts.push(el);
              }
            }
          })
          $scope.myOwnedPosts = myOwnedPosts;

          console.log('my owned game posts', $scope.myOwnedPosts);

        })

      })
    })
})();
