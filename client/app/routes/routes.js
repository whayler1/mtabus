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
        template: '<navbar></navbar><ui-view></ui-view>'
      })
      .state('routes.default', {
        url: '',
        data: {
          pageTitle: 'All Bus Routes',
          description: 'A list of all MTA bus routes serving NYC. Click a route to find bus stop locations and arrival times.'
        },
        controller: ($scope, $rootScope, routes, navbar) => {
          $rootScope.$emit('toggle-show-list-view', true);
        },
        template: '<routes-list routes="routes"></routes-list>'
      })
      .state('routes.search', {
        url: '/search?search',
        data: {
          pageTitle: 'Search Bus Routes'
        },
        resolve: {
          searchResults: ($q, $stateParams, routes) => {
            const { search } = $stateParams;
            if(!search || (search && search.trim() === '')) {
              return $q.when([]);
            }
            const regex = new RegExp(search.trim(), 'i');
            return $q.when(routes.data.list.filter(route => regex.test(route.shortName)));
          }
        },
        controller: ($scope, $stateParams, searchResults, navbar) => {
          $scope.searchResults = searchResults;
          $scope.search = $stateParams.search;

          navbar.isSearchExpanded = true;

          $scope.$on('$destroy', () => {
            navbar.isSearchExpanded = false;
          });
        },
        template: '<routes-list routes="searchResults" search="search"></routes-list>'
      });
  });
