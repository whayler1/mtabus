'use strict';

angular.module('mtabusApp')
  .directive('busesList', function () {
    return {
      templateUrl: 'components/buses-list/buses-list.html',
      restrict: 'E',
      scope: {
        buses: '='
      },
      controller: 'BusesListCtrl'
    };
  });
