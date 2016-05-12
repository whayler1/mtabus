'use strict';

angular.module('mtabusApp')
  .controller('BusStopMarkerCtrl', function (
    $scope,
    $element,
    $log,
    $timeout,
    map,
    mapMarkerConstructor
  ) {

    // $log.log('%cbus stop marker!', 'background:orange', $scope.stop);

    let focusTimeout;

    const stop = $scope.stop;

    let overlayView = new mapMarkerConstructor.GoogleOverlayView($element, new google.maps.LatLng(
      stop.lat,
      stop.lon
    ));
    overlayView.setMap(map.gmap);

    $scope.onFocus = () => {

      $timeout.cancel(focusTimeout);
      $scope.isFocus = true;
    };
    $scope.onBlur = () => {

      $timeout.cancel(focusTimeout);
      focusTimeout = $timeout(() => $scope.isFocus = false);
    }

    $scope.$on('$destroy', () => {
      $timeout.cancel(focusTimeout);
      overlayView.setMap(null);
    });
  });
