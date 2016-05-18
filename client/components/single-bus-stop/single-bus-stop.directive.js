'use strict';

angular.module('mtabusApp')
  .directive('singleBusStop', function () {
    return {
      templateUrl: 'components/single-bus-stop/single-bus-stop.html',
      restrict: 'E',
      scope: {
        busStop: '='
      },
      controller: 'SingleBusStopCtrl'
    };
  });
