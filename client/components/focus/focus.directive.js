'use strict';

angular.module('mtabusApp')
  .directive('focus', function () {
    return {
      restrict: 'A',
      controller: ($element, $timeout) => {
        $timeout(() => $element[0].focus());
      }
    };
  });
