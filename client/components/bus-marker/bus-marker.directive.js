'use strict';

angular.module('mtabusApp')
  .directive('busMarker', function () {
    return {
      templateUrl: 'components/bus-marker/bus-marker.html',
      restrict: 'E',
      scope: {
        bus: '='
      },
      replace: true,
      controller: 'BusMarkerCtrl'
    };
  });
