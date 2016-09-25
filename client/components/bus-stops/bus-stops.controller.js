'use strict';

angular.module('mtabusApp')
  .controller('BusStopsCtrl', function (
    $scope,
    $rootScope,
    busStops
  ) {
    $scope.stops = busStops.stops;

    const zoomInvalidListener = $rootScope.$on('bus-stop-zoom-invalid', () => {
      $scope.$digest()
    });

    $scope.$on('$destroy', () => {
      zoomInvalidListener();
    });
  });
