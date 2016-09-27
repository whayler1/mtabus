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
            console.log('routeSearch resolve', $stateParams, '\n routes', routes);
            const { search } = $stateParams;
            const regex = new RegExp(search, 'i');
            return $q.when(routes.data.list.filter(route => regex.test(route.shortName)));
          }
        },
        controller: ($scope, $stateParams, searchResults) => {
          console.log('%c searchResults:', 'background:aqua', searchResults);
          $scope.search = $stateParams.search;
          $scope.searchResults = searchResults;
        },
        template: '<navbar is-search-expanded="true" search="search"></navbar><routes-list routes="searchResults"></routes-list>'
      });
  });
