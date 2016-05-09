'use strict';

angular.module('mtabusApp')
  .controller('BusStopsCtrl', function (
    $scope,
    $log,
    $http,
    $timeout,
    map
  ) {

    const busStops = [];

    const getBusStops = (lat, lng) => $http.get(`/api/bus-stops?lat=${lat}&lng=${lng}`).then(
      res => {
        const newBusStops = res.data.data.stops;

        // busStops.forEach((stop, index) => {
        //   if(!_.find(newBusStops, {code: stop.code})) {
        //     busStops.splice(index, 1);
        //   }
        // });
        //
        // newBusStops.forEach(stop => {
        //   if(!_.find(busStops, {code: stop.code})) {
        //     busStops.push(stop);
        //   }
        // });

        angular.copy(newBusStops, busStops);
        $log.log('busStops:', busStops);
      },
      res => {
        $log.error('error retrieving bus stops', res);
      }
    );

    $log.log('bus stops');

    let mapCenterTimeout;

    let mapCenterChangedListener = map.gmap.addListener('center_changed', () => {
      const center = map.gmap.getCenter();
      $timeout.cancel(mapCenterTimeout);
      // $log.log('center_changed', map.gmap.getCenter());
      mapCenterTimeout = $timeout(() => getBusStops(center.lat(), center.lng()), 250);
    });

    $scope.busStops = busStops;

    $scope.$on('$destroy', () => {
      $timeout.cancel(mapCenterTimeout);
      google.maps.event.removeListener(mapCenterChangedListener);
    });
  });
