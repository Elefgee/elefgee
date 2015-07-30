(function () {
  'use strict';

  angular
    .module('elefgee', [
      'ngRoute',
      'ngAnimate',
      'underscore',
      'account',
      'angularMoment'
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
        .when('/account/:steamId', {
          templateUrl: 'account/views/account.html',
          controller: 'AccountController'
        })
        .when('/BONK', {
          templateUrl: 'login/views/redirectView.html',
          controller: 'SteamController'
        })
        .otherwise({
          redirectTo: '/BONK'
        });
    })
    .directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      }
    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
