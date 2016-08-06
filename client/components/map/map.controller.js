'use strict';

angular.module('mtabusApp')
  .controller('MapCtrl', function (
    $scope,
    $stateParams,
    $element,
    $window,
    $log,
    $timeout,
    $q,
    map
  ) {

    $log.log('%cmap created', 'background:pink');

    $element.replaceWith(map.gmapEl)
    map.redraw();
  });
