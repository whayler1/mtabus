'use strict';

angular.module('mtabusApp')
  .controller('SingleRouteCtrl', function ($scope) {
    console.log('SingleRouteCtrl:', $scope.route);
    $scope.routeDetails = _.find($scope.route.references.routes, {id: $scope.route.entry.routeId});
    console.log('routeDetails', $scope.routeDetails);

  });
