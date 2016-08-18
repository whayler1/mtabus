'use strict';

angular.module('mtabusApp')
  .directive('bodyClass', function () {
    return {
      restrict: 'A',
      controller: 'BodyClassCtrl'
    };
  });
