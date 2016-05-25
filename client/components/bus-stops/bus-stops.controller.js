'use strict';

angular.module('mtabusApp')
  .controller('BusStopsCtrl', function (
    $scope,
    $log,
    busStops
  ) {

    $log.log('%cbusStops:', 'background:yellow', $scope.stops);

    $scope.stops = busStops.stops;

    // const gmap = map.gmap;
    //
    // const onBoundsChanged = _.debounce(() => {
    //   console.log('map bounds updated!');
    // }, 250);
    //
    // const mapBoundsChangeListener = gmap.addListener('bounds_changed', onBoundsChanged);

    // $scope.$on('$destroy', () => {
    //   $log.log('%cbus stops destroy', 'background:pink');
    //   $window.google.maps.event.removeListener(mapBoundsChangeListener);
    // });
  });
