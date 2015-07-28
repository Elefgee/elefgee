(function () {
  'use strict';

  angular
    .module('account', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider

        .when('/account', {
          templateUrl: 'account/views/account.html',
          controller: 'AccountController'
        })

    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
