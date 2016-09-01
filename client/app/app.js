'use strict';

angular.module('mtabusApp', [
  'mtabusApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngPageTitle',
  'ui.router',
  'once'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
