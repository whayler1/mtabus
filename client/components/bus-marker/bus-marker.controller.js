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
    let rotationStr = `rotate(${bus.Bearing - 25}deg)`;
    $scope.style = {
      'transform': rotationStr,
      'webkit-transform': rotationStr
    };

    const marker = new RichMarker({
      map: map.gmap,
      position: new google.maps.LatLng(VehicleLocation.Latitude, VehicleLocation.Longitude),
      draggable: false,
      flat: true,
      anchor: RichMarkerPosition.MIDDLE,
      content: $element[0]
    });

    const vehicleLocationWatcher = $scope.$watch('bus.VehicleLocation', () => {
      const newVehicleLocation = bus.VehicleLocation;
      rotationStr = `rotate(${bus.Bearing - 25}deg)`;
      angular.copy({
        'transform': rotationStr,
        'webkit-transform': rotationStr
      }, $scope.style)
      marker.setPosition(new google.maps.LatLng(
        newVehicleLocation.Latitude,
        newVehicleLocation.Longitude
      ));
    });

    $scope.$on('$destroy', () => {
      vehicleLocationWatcher();
      marker.onRemove();
    });
  });
