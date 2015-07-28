(function () {
  'use strict';

  angular
    .module('account', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      
    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
