'use strict';

angular.module('mtabusApp')
  .controller('BusStopsCtrl', function (
    $scope,
    busStops
  ) {
    $scope.stops = busStops.stops;
  });
