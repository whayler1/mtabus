'use strict';

angular.module('mtabusApp', [
  'mtabusApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngPageTitle',
  'ui.router',
  'once',
  'yaru22.angular-timeago'
])
  .config(function($urlRouterProvider, $locationProvider, timeAgoSettings) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    timeAgoSettings.allowFuture = true;
  });
