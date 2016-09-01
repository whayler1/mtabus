'use strict';

angular.module('mtabusApp')
  .controller('BusStopListCtrl', function (
    $scope,
    $rootScope,
    busStops,
    analytics
  ) {
    $scope.stops = busStops.stops;
    $scope.isZoomValid = true;

    const zoomValidListener = $rootScope.$on('bus-stop-zoom-valid', () => $scope.isZoomValid = true);
    const zoomInvalidListener = $rootScope.$on('bus-stop-zoom-invalid', () => $scope.isZoomValid = false);

    $scope.toggleShowListView = () => {
      analytics.track('toggle-show-list-view');
      if(!$scope.stops.length) {
        $rootScope.$emit('toggle-show-list-view', false);
        return;
      }
      $rootScope.$emit('toggle-show-list-view');
    }

    $scope.$on('$destroy', () => {
      zoomValidListener();
      zoomInvalidListener();
    });
  });
