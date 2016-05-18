'use strict';

angular.module('mtabusApp')
  .controller('BusStopMarkerCtrl', function (
    $scope,
    $state,
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
      stop.isHover = true;
    };
    $scope.onBlur = () => {
      $timeout.cancel(focusTimeout);
      focusTimeout = $timeout(() => stop.isHover = false);
    }
    $scope.onClick = e => {
      e.preventDefault();
      $state.go('main.bus-stops.bus-stop', {
        id: stop.id
      });
      return false;
    };

    $scope.$on('$destroy', () => {
      $timeout.cancel(focusTimeout);
      overlayView.setMap(null);
    });
  });
