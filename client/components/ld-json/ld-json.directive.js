'use strict';

angular.module('mtabusApp')
  .directive('ldJson', function (
    $rootScope,
    $interpolate,
    $state
  ) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        const listener = function (event, toState) {

          let schema = '';

          if (_.has(toState, "data") && _.has(toState.data, 'schema') && _.isEmpty(toState.data.schema) === false) {
            schema = toState.data.schema;
          }

          let currentState = $state.$current;
          if (_.has(currentState, "locals") && _.has(currentState.locals, "globals")) {
            currentState = currentState.locals.globals;
          }

          schema = $interpolate(schema)(currentState);

          element.html(schema);
        };

        $rootScope.$on("$stateChangeSuccess", listener);
      }
    };
  });
