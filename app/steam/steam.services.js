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

      return {
        buildPlayerUrl: playerUrlOpts.buildUrl,
        getUserInfo: getUserInfo,
        getMe: getMe
      };

    });
})();
