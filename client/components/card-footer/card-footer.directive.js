'use strict';

angular.module('mtabusApp')
  .directive('cardFooter', function () {
    return {
      templateUrl: 'components/card-footer/card-footer.html',
      restrict: 'E',
      replace: true,
      scope: {}
    };
  });
