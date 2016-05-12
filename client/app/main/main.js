'use strict';

angular.module('mtabusApp').config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/?lat&lng',
      params: {
        /**
         * JW: Approximate center of NYC
         */
        lat: {
          value: '40.7128'
        },
        lng: {
          value: '-74.0059'
        }
      },
      abstract: true,
      template: '<map></map><user-location-marker></user-location-marker><ui-view></ui-view>'
    })
    .state('main.bus-stops', {
      url: '',
      resolve: {
        busStops: ($stateParams, $q, $log, $http, busTime) => {

          const lat = $stateParams.lat;
          const lng = $stateParams.lng;

          if(lat && lng) return busTime.getBusStops(lat, lng).then(
            res => {
              $log.log('%cbus stops success', 'background:lightgreen');
              return $q.when(res.data.data.stops);
            },
            res => {
              $log.error('error loading bus stops:', res);
              return $q.when([]);
            }
          );
          $log.log('no bus stop lat lng');
          return $q.when([]);
        }
      },
      controller: ($scope, $timeout, $state, $log, $window, busStops, map) => {

        $scope.busStops = busStops;

        let mapCenterTimeout;

        const gmap = map.gmap;

        let mapCenterListener = gmap.addListener('center_changed', () => {
          const center = gmap.getCenter()

          $timeout.cancel(mapCenterTimeout);
          mapCenterTimeout = $timeout(() => {
            $log.log('%cmapCenterTimeout!', 'background:aqua')
            $state.go('main.bus-stops', {
              lat: String(center.lat()),
              lng: String(center.lng())
            },{
              reload: true,
              notify: true,
              inherit: false
            })}, 250);
        });

        $scope.$on('$destroy', () => {
          $timeout.cancel(mapCenterTimeout);
          $window.google.maps.event.removeListener(mapCenterListener);
        });
      },
      template: '<bus-stops stops="busStops"></bus-stops>'
    });
});
