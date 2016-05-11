'use strict';

angular.module('mtabusApp')
  .directive('busStops', function () {
    return {
      templateUrl: 'components/bus-stops/bus-stops.html',
      restrict: 'E',
      scope: {
        stops: '='
      },
      controller: 'BusStopsCtrl'
    };
  });
