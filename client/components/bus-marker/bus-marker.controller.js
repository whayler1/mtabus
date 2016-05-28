'use strict';

angular.module('mtabusApp')
  .controller('BusMarkerCtrl', function (
    $scope,
    $element,
    map,
    mapMarkerConstructor
  ) {

    const bus = $scope.bus.MonitoredVehicleJourney;
    const location = bus.VehicleLocation;

    console.log('%cbus:', 'background:moccasin', bus);

    const rotationStr = `rotate(${Math.round(bus.Bearing)}deg)`;
    $scope.style = {
      'transform': rotationStr,
      '-webkit-transform': rotationStr
    };

    console.log('rotationStr:', rotationStr);

    const overlayView = new mapMarkerConstructor.GoogleOverlayView($element, new google.maps.LatLng(
      location.Latitude,
      location.Longitude
    ));
    overlayView.setMap(map.gmap);

    $scope.$on('$destroy', () => {
      console.log('%cdestroy bus marker!', 'background:red');
      overlayView.setMap(null);
    });
  });
