'use strict';

angular.module('mtabusApp')
  .directive('singleRoute', function () {
    return {
      templateUrl: 'components/single-route/single-route.html',
      restrict: 'EA',
      scope: {
        route: '='
      },
      controller: 'SingleRouteCtrl'
    };
  });
