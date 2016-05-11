'use strict';

angular.module('mtabusApp')
  .controller('BusStopMarkerCtrl', function (
    $scope,
    $element,
    $log,
    map,
    mapMarkerConstructor
  ) {

    // $log.log('%cbus stop marker!', 'background:orange', $scope.stop);

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
