'use strict';

angular.module('mtabusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        data: {
          pageTitle: 'About',
          description: 'Never miss your bus again! NYC Bus Time Finder helps New Yorkers find upcoming departure times for all nearby MTA buses.'
        },
        template: '<navbar></navbar><about></about>'
      });
  });
