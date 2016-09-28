'use strict';

angular.module('mtabusApp')
  .controller('UserLocationMarkerCtrl', function (
    $scope,
    $log,
    $element,
    $timeout,
    map,
    mapMarkerConstructor,
    location
  ) {

    $log.log('userLocationMarkerCtrl!');

    const { gmap } = map;

    let locationWatcher;
    let overlayView;

    let hasPositionBeenSetOnce = false;
    location.getCoords.then(coords => {
      overlayView = new mapMarkerConstructor.GoogleOverlayView($element[0], new google.maps.LatLng(
        coords.latitude,
        coords.longitude
      ));
      overlayView.setMap(gmap);
    });

    $scope.$on('$destroy', () => {
      if(overlayView) overlayView.setMap(null);
    })
  });
