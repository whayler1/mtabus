'use strict';

angular.module('mtabusApp')
  .directive('busStopList', function () {
    return {
      templateUrl: 'components/bus-stop-list/bus-stop-list.html',
      restrict: 'E',
      scope: {
        stops: '='
      },
      controller: 'BusStopListCtrl'
    };
  });
