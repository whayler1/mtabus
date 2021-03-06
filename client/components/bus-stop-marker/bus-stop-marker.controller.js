'use strict';

angular.module('mtabusApp')
  .controller('BusStopMarkerCtrl', function (
    $scope,
    $state,
    $stateParams,
    $element,
    $log,
    $timeout,
    map,
    mapMarkerConstructor,
    analytics
  ) {

    let focusTimeout;

    const stop = $scope.stop;

    let overlayView = new mapMarkerConstructor.GoogleOverlayView($element[0], new google.maps.LatLng(
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
      analytics.track('bus-stop-marker-click');
      $state.go('main.bus-stop', {
        id: stop.id
      });
      return false;
    };
    $scope.active = () => $stateParams.id === stop.id;
    $scope.isMinimized = () => $stateParams.id ? true : false;

    $scope.$on('$destroy', () => {
      $timeout.cancel(focusTimeout);
      overlayView.setMap(null);
    });
  });
