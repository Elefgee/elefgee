(function () {
  'use strict';
  angular
    .module('elefgee')
    .factory('SteamService', function ($http, _, $q, $cacheFactory, $rootScope) {

      var getUserInfo = function() {
        return $http.get('/user');
      }

      var getMe = function () {
        return $http.get('/me');
      }

      var addPost = function(post) {
        $http.put('/posts', post).success(function(data){
         console.log('I just posted this data!', data);
         $rootScope.$broadcast('post:added');
        })
      }

      var deletePost = function(post, id) {
        console.log(post);
        $http.put('/deletePost', post).then(function(data){
          console.log('I just deleted this data!', data);
          $rootScope.$broadcast('post:deleted');
        })
      }

      // var addReviewUser = function(user, userReview) {
      //   user.userReview = userReview;
      //   $http.put('/addReview', user).then(function(data){
      //     console.log('I just added a review!', data)
      //     // $rootScope.$broadcast('review:added');
      //   })
      // }

      var addReview = function(user, userObj) {
        user.userObj = userObj;
        $http.put('/addReview', user).then(function(data){
          console.log('I just added a review!', data)
          // $rootScope.$broadcast('review:added');
        })
      }

      return {
        getUserInfo: getUserInfo,
        addPost: addPost,
        deletePost: deletePost,
        // addReviewUser: addReviewUser,
        addReview: addReview,
        getMe: getMe
      };

    });
})();
