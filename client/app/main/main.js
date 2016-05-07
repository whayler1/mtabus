'use strict';

angular.module('mtabusApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<map></map>'
      });
  });
