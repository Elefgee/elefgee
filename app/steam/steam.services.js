(function () {
  'use strict';
  angular
    .module('elefgee')
    .factory('SteamService', function ($http, _, $q, $cacheFactory) {
      var playerUrlOpts = {
        baseUrl: 'https://api.steampowered.com',
        apiKey: '41AB27857C781D410407E14B482DB2ED',
        buildUrl: function (interfaceName, methodName, versionName, steamId) {
          var url = playerUrlOpts.baseUrl + '/' + interfaceName + '/' + methodName + '/v' + versionName + '/?key=' + playerUrlOpts.apiKey + '&steamids=' + steamId;
          console.log(url);
          return url;
        }
      };

      var getPlayerSummary = function(interfaceName, methodName, versionName, steamId) {
        $http.jsonp(playerUrlOpts.buildUrl(interfaceName, methodName, versionName, steamId)).then(function (summary) {
          console.log('SUMMARY: ', summary);
          var playerSummary = summary.players;
          return playerSummary;
        });
      }

      return {
        buildPlayerUrl: playerUrlOpts.buildUrl,
        getPlayerSummary: getPlayerSummary
      };

    });
})();
