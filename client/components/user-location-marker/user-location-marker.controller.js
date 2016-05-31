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

    const gmap = map.gmap;

    let locationWatcher;
    let overlayView;

    let hasPositionBeenSetOnce = false;

    if(_.hasIn($window, 'navigator') && _.hasIn($window.navigator, 'geolocation')) {

      locationWatcher = $window.navigator.geolocation.watchPosition(
        position => {

          const coords = position.coords;
          const newLatLng = new google.maps.LatLng(
            coords.latitude,
            coords.longitude
          );

          $log.log('watchPos:', coords);

          if(overlayView) overlayView.setMap(null);

          overlayView = new mapMarkerConstructor.GoogleOverlayView($element, newLatLng);
          overlayView.setMap(gmap);

          if(!hasPositionBeenSetOnce) {
            hasPositionBeenSetOnce = true;
            gmap.setCenter(newLatLng);
          }
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
