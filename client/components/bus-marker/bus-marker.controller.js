'use strict';

angular.module('mtabusApp')
  .controller('BusMarkerCtrl', function (
    $scope,
    $element,
    $window,
    map,
    mapMarkerConstructor
  ) {

    const bus = $scope.bus.MonitoredVehicleJourney;
    const location = bus.VehicleLocation;

    console.log('%cbus:', 'background:moccasin', bus);

    const rotationStr = `rotate(${Math.round(bus.Bearing)}deg)`;
    $scope.style = {
      'transform': rotationStr,
      '-webkit-transform': rotationStr,
      '-moz-transform': rotationStr
    };

    console.log('rotationStr:', rotationStr);

    const overlayView = new mapMarkerConstructor.GoogleOverlayView($element, new $window.google.maps.LatLng(
      location.Latitude,
      location.Longitude
    ));
    overlayView.setMap(map.gmap);

    console.log('%cbus overlay view:', 'background:pink', overlayView);

    $scope.$on('$destroy', () => {
      console.log('%cdestroy bus marker!', 'background:red');
      overlayView.setMap(null);
    });
  });
