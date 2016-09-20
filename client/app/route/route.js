'use strict';

angular.module('mtabusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('route', {
        url: '/routes/:routeId/:shortName',
        resolve: {
          route: ($q, $log, $stateParams, busTime) => busTime.getRoute($stateParams.routeId).then(
            res => $q.when(res.data.data),
            err => {
              $log.error('err!', err);
              return $q.when();
            }
          ),
          shortName: ($q, $stateParams) => $q.when($stateParams.shortName)
        },
        data: {
          pageTitle: '{{ shortName }} Bus Route'
        },
        controller: ($scope, $rootScope, route) => {
          console.log('route', route);
          $scope.route = route;
          $rootScope.$emit('toggle-show-list-view', true);
        },
        template: '<navbar></navbar><single-route route="route"></single-route>'
      });
  });
