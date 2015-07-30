(function () {
  'use strict';
  angular
    .module('elefgee')
    .factory('SteamService', function ($http, _, $q, $cacheFactory) {
      var playerUrlOpts = {
        baseUrl: 'https://api.steampowered.com',
        apiKey: '41AB27857C781D410407E14B482DB2ED',
        buildUrl: function (interfaceName, methodName, versionName, steamId) {
          var url = playerUrlOpts.baseUrl + '/' + interfaceName + '/' + methodName + '/v' + versionName + "/?callback=JSON_CALLBACK" + '&key=' + playerUrlOpts.apiKey + '&steamids=' + steamId + "&full=1";
          console.log(url);
          return url;
        }
      };
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
        buildPlayerUrl: playerUrlOpts.buildUrl,
        getUserInfo: getUserInfo,
        addPost: addPost,
        getMe: getMe
      };

    });
})();
