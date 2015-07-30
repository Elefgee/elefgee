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
        })
      }

      var deletePost = function(post, id) {
        console.log(post);
        $http.put('/deletePost', post).then(function(data){
          console.log('I just deleted this data!', data);
          $rootScope.$broadcast('post:deleted');
        })
      }

      return {
        getUserInfo: getUserInfo,
        addPost: addPost,
        deletePost: deletePost,
        getMe: getMe
      };

    });
})();
