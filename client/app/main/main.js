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
      template: '<navbar></navbar><map></map><user-location-marker></user-location-marker><ui-view></ui-view>'
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
      controller: ($scope, $rootScope, $timeout, $state, $log, $window, busStops, map) => {

        $scope.busStops = busStops;

        $log.log('%cbus stops:', 'background:yellow', busStops);

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

        /**
         * JW: This is a hacky way of being sure all the bus stops get cleared
         * before state change. Should revisit and make smoother.
         */
        const stateChangeStartListener = $rootScope.$on('$stateChangeStart', () => busStops.length = 0);

        $scope.$on('$destroy', () => {

          stateChangeStartListener();
          $timeout.cancel(mapCenterTimeout);
          $window.google.maps.event.removeListener(mapCenterListener);
        });
      },
      template: '<bus-stop-list stops="busStops"></bus-stop-list><bus-stop-marker ng-repeat="stop in busStops track by stop.id" stop="stop"></bus-stop-marker>'
    });
});
