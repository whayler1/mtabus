'use strict';

angular.module('mtabusApp')
  .controller('UserLocationButtonCtrl', function (
    $scope,
    $window,
    map,
    location,
    analytics
  ) {

    const hasGeoloc = (_.hasIn($window, 'navigator') && _.hasIn($window.navigator, 'geolocation'));
    const { gmap } = map;

    $scope.shouldShow = false;
    location.getCoords.then(() => $scope.shouldShow = true);

    $scope.onClick = () => {
      analytics.track('user-location-button-click');
      location.getCoords.then(
        coords => gmap.setCenter(new google.maps.LatLng(
          coords.latitude,
          coords.longitude
        ))
      );
    };
  });
