'use strict';

angular.module('mtabusApp', [
  'mtabusApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngPageTitle',
  'ui.router'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
