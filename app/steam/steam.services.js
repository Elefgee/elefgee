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

      var getPlayerSummary = function(interfaceName, methodName, versionName, steamId) {

        var request = {
          method: 'JSONP',
          url: playerUrlOpts.buildUrl(interfaceName, methodName, versionName, steamId),
          headers: {
            "Content-Type": "*/*",
            "Origins": "*"
          }
        }
        $http(request).success(function() {
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
