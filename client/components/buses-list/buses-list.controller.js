'use strict';

angular.module('mtabusApp')
  .controller('BusesListCtrl', function (
    $scope,
    map
  ) {

    const gmap = map.gmap;

    $scope.goToLoc = (lat, lng) => gmap.setCenter({
      lat: lat,
      lng: lng
    });
  });
