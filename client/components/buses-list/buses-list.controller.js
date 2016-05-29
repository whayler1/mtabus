'use strict';

angular.module('mtabusApp')
  .controller('BusesListCtrl', function (
    $scope,
    $stateParams,
    map
  ) {

    console.log('route', $stateParams.route);
    console.log('BusesListCtrl!', $scope.busStop);
    console.log('MEWO', _.find($scope.busStop.routes, {shortName:$stateParams.route}));
    const gmap = map.gmap;

    $scope.route = _.find($scope.busStop.routes, {shortName:$stateParams.route});

    $scope.goToLoc = (lat, lng) => gmap.setCenter({
      lat: lat,
      lng: lng
    });
  });
