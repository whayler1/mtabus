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

    $element.replaceWith(map.gmapEl)
    map.redraw();
  });
