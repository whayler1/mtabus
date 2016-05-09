'use strict';

angular.module('mtabusApp')
  .controller('BusStopMarkerCtrl', function (
    $scope,
    $element,
    map,
    mapMarkerConstructor
  ) {

    // console.log('bus stop!', $scope.stop);

    const stop = $scope.stop;

    let overlayView = new mapMarkerConstructor.GoogleOverlayView($element, new google.maps.LatLng(
      stop.lat,
      stop.lon
    ));
    overlayView.setMap(map.gmap);

    $scope.$on('$destroy', () => {
      overlayView.setMap(null);
    });
  });
