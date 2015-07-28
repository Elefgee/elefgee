(function () {
  'use strict';

  angular
    .module('account', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider

    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
