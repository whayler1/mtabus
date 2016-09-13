'use strict';

angular.module('mtabusApp')
  .directive('routesList', function () {
    return {
      templateUrl: 'components/routes-list/routes-list.html',
      restrict: 'EA',
      scope: {
        routes: '='
      },
      controller: 'RoutesListCtrl'
    };
  });
