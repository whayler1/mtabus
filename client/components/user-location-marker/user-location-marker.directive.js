'use strict';

angular.module('mtabusApp')
  .directive('userLocationMarker', function () {
    return {
      templateUrl: 'components/user-location-marker/user-location-marker.html',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: 'UserLocationMarkerCtrl'
    };
  });
