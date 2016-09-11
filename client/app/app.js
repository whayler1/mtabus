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
  })

  .run(function($rootScope, $window, $location) {
    $rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
      const path = $location.path();
      let search = '';
      let referrer = '';
      const searchIndex = path.indexOf('?');
      if(searchIndex !== -1) {
        search = path.substring(searchIndex, path.length);
      }
      if(fromState.name) {
        referrer = `${$location.protocol()}://${$location.host()}${fromState.url}`;
      }

      $window.analytics.page({
        path,
        referrer,
        search,
        name: toState.name,
        url: $location.absUrl()
      });
    });
  });
