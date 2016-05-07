'use strict';

angular.module('mtabusApp')
  .directive('map', function () {
    return {
      // templateUrl: 'components/map/map.html',
      restrict: 'E',
      scope: {},
      controller: 'MapCtrl'
    };
  });
