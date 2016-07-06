/* jshint esversion:6 */
var app = angular.module("UmassEMSApp", ['ui.router', 'hc.marked', 'ngCookies', 'ngTouch']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/pages/home.html'
    })
    .state('shifts', {
      url: '/shifts',
      templateUrl: 'views/pages/shifts.html'
    })
    .state('staff', {
      url: '/staff',
      templateUrl: 'views/pages/staff.html'
    })
    .state('about', {
      url: "/about",
      templateUrl: 'views/pages/about.html'
    })
    .state('join', {
      url: '/join',
      templateUrl: 'views/pages/join.html'
    })
    .state('class', {
      url: '/class',
      templateUrl: 'views/pages/class.html'
    })
    .state('cpr', {
      url: '/cpr',
      templateUrl: 'views/pages/cpr.html'
    })
    .state('info', {
      url: '/info',
      templateUrl: 'views/pages/info.html'
    });
});
