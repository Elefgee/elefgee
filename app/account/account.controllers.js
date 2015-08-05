(function () {
  'use strict';
  angular
    .module('account')
    .controller('AccountController', function($scope, $route, SteamService, _, $routeParams, $location) {
      var ua = navigator.userAgent;
      var isMobile = /Mobile/.test(ua);
      console.log(isMobile);

      if (isMobile) {
        $('#loginAbso').css('opacity', '0');
      }

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
        $scope.loggedIn = function(meName) {
          if (meName === undefined) {
            $location.path('/BONK')
          }
          else if (meName.length > 0) {
            return true;
          }
        }
      })

      if($routeParams.steamId) {
        SteamService.getUserInfo().success(function(data){
          var routeSteamId = $routeParams.steamId;
          var foundUser = _.where(data, {steamId: routeSteamId});
          if (foundUser[0] === undefined) {
            $location.path('/BONK');
          } else {
            $scope.user = foundUser[0];
            $scope.games = foundUser[0].games;
            $scope.posts = foundUser[0].posts;
            $scope.rating = foundUser[0].rating;
            $scope.raters = foundUser[0].raters;
            $scope.gamesList = _.sortBy(foundUser[0].games.games, 'name');
            console.log($scope.user);
            console.log($scope.raters);
          }

          /// Rating ///
          var accountRating = $scope.rating;
          var elementAdded = document.getElementById('rating')

          for (var i = 0; i < accountRating; i++) {
            var rating = document.createElement('i');
            rating.className = 'fa fa-star';
            console.log('adding star');
            elementAdded.appendChild(rating);
          }

          $scope.openModal = function() {
              if ($scope.me.displayName === $scope.user.displayName) {
                alert("You can't rate yourself!");
              } else if (_.contains($scope.raters, $scope.me.displayName)){
                alert("You've already reviewed this user.")
              } else {
                $('.modal').removeClass('hidden');
                $('.overflow').addClass('bodyOverflow');
              }
          }

          $scope.addUserReview = function(num) {
            if ($scope.me.displayName === $scope.user.displayName) {
              alert("You can't rate yourself!");
            } else if (_.contains($scope.raters, $scope.me.displayName)){
              alert("You've already reviewed this user.")
            } else {
              var user = {}
              user.userReview = $scope.me.displayName;
              user.stars = num;
              $('.modal').addClass('hidden');
              SteamService.addReview($scope.user, user);
            }
          }
        });
      }


      $scope.cancelButton = function() {
        $('.modal').addClass('hidden');
        $('.overflow').removeClass('bodyOverflow');
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

      $scope.deletePost = function(time, text, userData) {
        console.log(userData);
        var selectedPost = {timestamp: time, text: text, userData: userData};
        var id = $routeParams.steamId;
        SteamService.deletePost(selectedPost);
      }

      $scope.timeConvert = function(timestamp) {
        console.log(timestamp)
        return timestamp.getTime();
      }

      var postDeletedCallback = function() {
        console.log('CALLIN BACK');
        SteamService.getUserInfo().success(function(data){
          var routeSteamId = $routeParams.steamId;
          var foundUser = _.where(data, {steamId: routeSteamId});
          console.log(foundUser[0].posts);
          $scope.posts = foundUser[0].posts;
        });
      }

      // var reviewAddedCallback = function() {
      //   console.log('CALLIN BACK');
      //   SteamService.getUserInfo().success(function(data){
      //     var routeSteamId = $routeParams.steamId;
      //     var foundUser = _.where(data, {steamId: routeSteamId});
      //     console.log(foundUser[0].rating);
      //     $scope.posts = foundUser[0].rating;
      //   });
      // }

      $scope.$on('post:deleted', postDeletedCallback);
      // $scope.$on('review:added', reviewAddedCallback);

    })

    ////////// MODAL SCRIPTS //////////


})();
