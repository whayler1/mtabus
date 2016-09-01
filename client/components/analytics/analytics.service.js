'use strict';

angular.module('mtabusApp')
  .service('analytics', function (
    $window,
    $log
  ) {
    if('analytics' in $window) {
      return $window.analytics;
    }
    return {
      track: () => $log.warn('analytics not in window')
    }
  });
