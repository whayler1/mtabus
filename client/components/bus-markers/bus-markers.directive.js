'use strict';

angular.module('mtabusApp')
  .directive('busMarkers', function () {
    return {
      templateUrl: 'components/bus-markers/bus-markers.html',
      restrict: 'E',
      scope: {
        buses: '='
      },
      controller: ($scope) => {
        console.log('BUS MARKERS', $scope.buses);
      }
    };
  });
