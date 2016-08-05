'use strict';

angular.module('mtabusApp')
  .directive('userLocationButton', function () {
    return {
      templateUrl: 'components/user-location-button/user-location-button.html',
      restrict: 'E',
      scope: {},
      controller: 'UserLocationButtonCtrl'
    };
  });
