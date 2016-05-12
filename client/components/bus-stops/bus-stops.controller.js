'use strict';

angular.module('mtabusApp')
  .controller('BusStopsCtrl', function (
    $scope,
    $log,
    $http,
    $timeout,
    map
  ) {

    $log.log('%cbusStops:', 'background:yellow', $scope.stops);

    $scope.$on('$destroy', () => {
      $log.log('%cbus stops destroy', 'background:pink');
      $scope.stops.length = 0;
    });
  });
