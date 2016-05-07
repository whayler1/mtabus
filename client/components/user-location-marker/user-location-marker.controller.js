'use strict';

angular.module('mtabusApp')
  .controller('UserLocationMarkerCtrl', function (
    $scope,
    $log,
    $window,
    $element,
    $timeout,
    map,
    mapMarkerConstructor
  ) {

    $log.log('userLocationMarkerCtrl!');

    let locationWatcher;
    let overlayView;

    if(_.hasIn($window, 'navigator') && _.hasIn($window.navigator, 'geolocation')) {

      locationWatcher = $window.navigator.geolocation.watchPosition(
        position => {

          const coords = position.coords;

          $log.log('watchPos:', coords);

          if(overlayView) overlayView.setMap(null);

          overlayView = new mapMarkerConstructor.GoogleOverlayView($element, new google.maps.LatLng(
            coords.latitude,
            coords.longitude
          ));
          overlayView.setMap(map.gmap);
        },
        res => {
          $log.warn('watch position fail');
        },
        {
          enableHighAccuracy: true
        }
      );
    }

    $scope.$on('$destroy', () => {
      $window.navigator.geolocation.clearWatch(locationWatcher);
      if(overlayView) overlayView.setMap(null);
    })
  });
