'use strict';

angular.module('mtabusApp')
  .controller('BusStopsCtrl', function (
    $scope,
    $log,
    $http,
    $timeout,
    map
  ) {

    $log.log('busStops:', $scope.stops);
  });
