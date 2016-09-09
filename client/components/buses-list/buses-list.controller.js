'use strict';

angular.module('mtabusApp')
  .controller('BusesListCtrl', function (
    $scope,
    $stateParams,
    map,
    analytics,
    busesList
  ) {

    // console.log('route', $stateParams.route);
    // console.log('BusesListCtrl!', $scope.busStop);
    const gmap = map.gmap;

    $scope.route = _.find($scope.busStop.routes, {shortName:$stateParams.route});

    $scope.busesList = busesList;

    $scope.goToLoc = (lat, lng) => {
      analytics.track('bus-location-click');
      gmap.setCenter({
        lat: lat,
        lng: lng
      });
    };
  });
