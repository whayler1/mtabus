'use strict';

angular.module('mtabusApp')
  .directive('busStopMarker', function () {
    return {
      templateUrl: 'components/bus-stop-marker/bus-stop-marker.html',
      restrict: 'E',
      scope: {
        stop: '='
      },
      controller: 'BusStopMarkerCtrl'
    };
  });
