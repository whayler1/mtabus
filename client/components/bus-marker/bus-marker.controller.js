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
    const { VehicleLocation } = bus;

    $scope.bus = bus;

    const marker = new RichMarker({
      map: map.gmap,
      position: new google.maps.LatLng(VehicleLocation.Latitude, VehicleLocation.Longitude),
      draggable: false,
      flat: true,
      anchor: RichMarkerPosition.MIDDLE,
      content: $element[0]
    });

    $scope.$watch('bus.VehicleLocation', () => {
      const newVehicleLocation = bus.VehicleLocation;
      marker.setPosition(new google.maps.LatLng(
        newVehicleLocation.Latitude,
        newVehicleLocation.Longitude
      ));
    });

    $scope.$on('$destroy', () => {
      // console.log('%cdestroy bus marker!', 'background:red');
      marker.onRemove();
    });
  });
