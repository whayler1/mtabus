'use strict';

angular.module('mtabusApp')
  .directive('alerts', function () {
    return {
      templateUrl: 'components/alerts/alerts.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
