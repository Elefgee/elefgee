(function () {
  'use strict';

  angular
    .module('elefgee', [
      'ngRoute',
      'ngAnimate',
      'underscore',
      'account'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          redirectTo: '/login'
        })
        .when('/login', {
          templateUrl: 'login/views/login.html',
          controller: 'LoginController'
        })
        .when('/feed', {
          templateUrl: 'feed/views/feed.html',
          controller: 'FeedController'
        })
        .when('/post', {
          templateUrl: 'post/views/post.html',
          controller: 'PostController'
        })
        .when('/404', {
          template: '<h2>Sorry, page not found</h2>'
        })
        .otherwise({
          redirectTo: '/404'
        });
    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
