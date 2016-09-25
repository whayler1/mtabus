'use strict';

angular.module('mtabusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('routes', {
        url: '/routes',
        data: {
          pageTitle: 'All Bus Routes',
          description: 'A list of all MTA bus routes serving NYC. Click a route to find bus stop locations and arrival times.'
        },
        resolve: {
          routes: ($q, $log, busTime) => busTime.getRoutes().then(
            res => {
              return $q.when(res.data);
            },
            err => $log.error('routes errer!')
          )
        },
        controller: ($scope, $rootScope, routes) => {
          $scope.routes = routes.data.list;
          $rootScope.$emit('toggle-show-list-view', true);
        },
        template: '<navbar></navbar><routes-list routes="routes"></routes-list>'
      });
  });
