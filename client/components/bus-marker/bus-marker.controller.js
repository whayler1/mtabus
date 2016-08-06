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

    console.log('%cbus:', 'background:moccasin', bus.FramedVehicleJourneyRef.DatedVehicleJourneyRef);

    const overlayView = new mapMarkerConstructor.GoogleOverlayView($element[0], new $window.google.maps.LatLng(
      VehicleLocation.Latitude,
      VehicleLocation.Longitude
    ));
    overlayView.setMap(map.gmap);

    $scope.bus = bus;

    $scope.$on('$destroy', () => {
      console.log('%cdestroy bus marker!', 'background:red');
      overlayView.setMap(null);
    });
  });
