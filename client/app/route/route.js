'use strict';

angular.module('mtabusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('route', {
        url: '/routes/:routeId',
        resolve: {
          route: ($q, $log, $stateParams, busTime) => busTime.getRoute($stateParams.routeId).then(
            res => {
              const { data } = res.data;
              data.route = _.find(data.references.routes, {id: data.entry.routeId});
              return $q.when(data);
            },
            err => {
              $log.error('err!', err);
              return $q.when();
            }
          )
        },
        data: {
          pageTitle: '{{ route.route.shortName }} Bus Route'
        },
        controller: ($scope, $rootScope, route) => {
          console.log('route', route);
          $scope.route = route;
          $rootScope.$emit('toggle-show-list-view', true);
        },
        template: '<navbar></navbar><single-route route="route"></single-route><ui-view></ui-view>'
      })
      .state('route.group', {
        url: '/:stopGroupId',
        template: ''
      });
  });
