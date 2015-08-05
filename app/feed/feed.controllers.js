(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('FeedController', function($scope, $route, SteamService, $location, $rootScope) {
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

      $scope.openFilterBlock = function(chevron) {
        var chevron = $('#filterCollapse');
        $('.feedFilterMain').slideToggle();
        $(chevron).toggleClass('fa-chevron-down');
        $(chevron).toggleClass('fa-chevron-up');
      }

      $scope.isTrue = function(clicked) {
        var nameBtn = _.findWhere($scope.navs, {name: clicked})
        return nameBtn.active;
      }

      $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        if (keyname === 'timestamp') {
          $scope.reverse = true;
        } else {
          $scope.reverse = false;
        }
      }

      $scope.sort('timestamp');

      $scope.feedNavClick = function(clicked) {
        _.each($scope.navs, function(el){
          el.active = false;
        });
       var clickedBtn = _.findWhere($scope.navs, {name: clicked});
       clickedBtn.active = true;
       return clickedBtn.active;
      }

      //// ALL POSTS ////
      SteamService.getUserInfo().success(function(data){
      $scope.allPosts = [];
      _.each(data, function(el, idx, list) {
        _.each(data[idx].posts, function(el2, idx2) {
          $scope.allPosts.push(el2);
        })
      });
      $scope.user = data[0];

      //// OWNED POSTS ////
      SteamService.getMe().success(function(me){
        var me = me;
        SteamService.getUserInfo().success(function(allUsers) {

          var allPosts = [];
          _.each(allUsers, function(el, idx, list) {
            _.each(allUsers[idx].posts, function(el2, idx2) {
              allPosts.push(el2);
            })
          });

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
        })

      })
    })


    //// REFRESH POSTS ////


      $scope.$route = $route;

      if (($location.path()) === '/feed') {
        setInterval(function() {
        //// ALL POSTS ////
        SteamService.getUserInfo().success(function(data){
        $scope.allPosts = [];
        _.each(data, function(el, idx, list) {
          _.each(data[idx].posts, function(el2, idx2) {
            $scope.allPosts.push(el2);
          })
        });
        $scope.user = data[0];

        //// OWNED POSTS ////
        SteamService.getMe().success(function(me){
          var me = me;
          SteamService.getUserInfo().success(function(allUsers) {

            var allPosts = [];
            _.each(allUsers, function(el, idx, list) {
              _.each(allUsers[idx].posts, function(el2, idx2) {
                allPosts.push(el2);
              })
            });

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
          })

        })
      })}, 1000);
    }

      SteamService.getMe().success(function (me) {
        $scope.me = me;
        console.log(me);
        $scope.loggedIn = function(displayName) {
          if (displayName === undefined) {
            $location.path('/BONK')
          }
          else if (displayName.length > 0) {
            return true;
          }
        }
      });


    })
})();
