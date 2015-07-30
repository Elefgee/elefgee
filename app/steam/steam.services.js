(function () {
  'use strict';
  angular
    .module('elefgee')
    .factory('SteamService', function ($http, _, $q, $cacheFactory) {
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
      return {
        getUserInfo: getUserInfo,
        addPost: addPost,
        getMe: getMe
      };

    });
})();
