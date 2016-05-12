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

    const addMap = () => $element.replaceWith(map.gmapEl);

    addMap();
    map.redraw();
  });
