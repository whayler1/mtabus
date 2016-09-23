'use strict';

angular.module('mtabusApp')
  .controller('SingleRouteCtrl', function ($scope) {
    console.log('SingleRouteCtrl:', $scope.route);
    const _stopGroups = $scope.route.entry.stopGroupings[0].stopGroups;
    $scope.stopGroups = [];
    _stopGroups.forEach(stopGroup => {
      $scope.stopGroups.push({
        name: stopGroup.name.name,
        stops: stopGroup.stopIds.map(stopId => _.find($scope.route.references.stops, {id: stopId}))
      });
    });
    console.log('stopGroups:', $scope.stopGroups);
  });
