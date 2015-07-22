(function () {
  'use strict';
  angular
    .module('elefgee')
    .controller('LoginController', function($scope, $route, SteamService) {
      $scope.$route = $route;

      SteamService.buildPlayerUrl('ISteamUser', 'GetPlayerSummaries', '0002', '76561197960435530');

      SteamService.getPlayerSummary('ISteamUser', 'GetPlayerSummaries', '0002', '76561197960435530');

      $scope.urlTest = SteamService.buildPlayerUrl('one', 'two', 'three');

    })
})();
