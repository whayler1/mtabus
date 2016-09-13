'use strict';

angular.module('mtabusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('routes', {
        url: '/routes',
        data: {
          pageTitle: 'All Bus Routes',
          descriptions: 'A list of all MTA bus routes serving NYC. Click a route to find bus stop locations and arrival times.'
        },
        resolve: {
          routes: ($q, $log, busTime) => busTime.getRoutes().then(
            res => {
              $log.log('%c routes!', 'backgriund:yellowgreen', res.data);

              return $q.when(res.data);
            },
            err => $log.error('routes errer!')
          )
        },
        controller: ($scope, routes) => {
          $scope.routes = routes.data.list;
          console.log('routes:', $scope.routes);
        },
        template: '<navbar></navbar><routes-list routes="routes"></routes-list>'
      });
  });
