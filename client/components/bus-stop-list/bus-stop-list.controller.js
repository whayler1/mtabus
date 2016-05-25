'use strict';

angular.module('mtabusApp')
  .controller('BusStopListCtrl', function (
    $scope,
    busStops
  ) {
    $scope.stops = busStops.stops;
  });
