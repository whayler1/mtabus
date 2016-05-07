'use strict';

angular.module('mtabusApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<user-location-marker></user-location-marker><map></map>'
      });
  });
