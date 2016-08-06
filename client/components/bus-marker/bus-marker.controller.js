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

    // console.log('%cbus:', 'background:moccasin', bus.FramedVehicleJourneyRef.DatedVehicleJourneyRef);

    // const overlayView = new mapMarkerConstructor.GoogleOverlayView($element[0], new $window.google.maps.LatLng(
    //   VehicleLocation.Latitude,
    //   VehicleLocation.Longitude
    // ));
    // overlayView.setMap(map.gmap);
    //
    // const updateLatLng = latlng => {
    //   const panes = overlayView.getPanes();
    //   const point = overlayView.getProjection().fromLatLngToDivPixel(latlng);
    //   const { element } = overlayView;
    //   if (point) {
    //     element.style.left = `${point.x}px`;
    //     element.style.top = `${point.y}px`;
    //   }
    // };

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
      // console.log('%c lat update', 'background:orange', newVehicleLocation.Latitude, newVehicleLocation.Longitude);
      marker.setPosition(new google.maps.LatLng(
        newVehicleLocation.Latitude,
        newVehicleLocation.Longitude
      ));
    });

    $scope.$on('$destroy', () => {
      // console.log('%cdestroy bus marker!', 'background:red');
      // overlayView.setMap(null);
    });
  });
