'use strict';

angular.module('mtabusApp')
  .directive('contentAttrib', function (
    $rootScope,
    $interpolate,
    $state
  ) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        const listener = function (event, toState) {

          let content = '';
          const metaName = attrs.name;

          if (_.has(toState, "data") && _.has(toState.data, metaName) && _.isEmpty(toState.data[metaName]) === false) {
            content = toState.data.description;
          }

          let currentState = $state.$current;
          if (_.has(currentState, "locals") && _.has(currentState.locals, "globals")) {
            currentState = currentState.locals.globals;
          }

          content = $interpolate(content)(currentState);

          element.attr('content', content);
        };

        $rootScope.$on("$stateChangeSuccess", listener);
      }
    };
  });
