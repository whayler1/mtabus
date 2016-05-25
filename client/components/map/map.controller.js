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

    const gmap = map.gmap;

    $element.replaceWith(map.gmapEl)
    map.redraw();
  });
