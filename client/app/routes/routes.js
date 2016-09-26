'use strict';

angular.module('mtabusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('routes', {
        url: '/routes',
        abstract: true,
        resolve: {
          routes: ($q, $log, busTime) => busTime.getRoutes().then(
            res => {
              return $q.when(res.data);
            },
            err => $log.error('routes errer!')
          )
        },
        controller: ($scope, routes) => {
          $scope.routes = routes.data.list;
        },
        template: '<ui-view></ui-view>'
      })
      .state('routes.default', {
        url: '',
        data: {
          pageTitle: 'All Bus Routes',
          description: 'A list of all MTA bus routes serving NYC. Click a route to find bus stop locations and arrival times.'
        },
        controller: ($scope, $rootScope, routes) => {
          $rootScope.$emit('toggle-show-list-view', true);
        },
        template: '<navbar></navbar><routes-list routes="routes"></routes-list>'
      })
      .state('routes.search', {
        url: '/search?search',
        data: {
          pageTitle: 'Search Bus Routes'
        },
        resolve: {
          searchResults: ($q, $stateParams, routes) => {
            console.log('routeSearch resolve', $stateParams, '\n routes');
            const { search } = $stateParams;
            return $q.when([]);
          }
        },
        template: '<navbar is-search-expanded="true"></navbar><routes-list routes="searchResults"></routes-list>'
      });
  });
