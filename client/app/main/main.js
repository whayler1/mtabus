'use strict';

angular.module('mtabusApp').config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/?lat&lng',
      params: {
        lat: {
          value: '40.7128'
        },
        lng: {
          value: '-74.0059'
        }
      },
      resolve: {
        busStops: ($stateParams, $q, $log, $http, busTime) => {
          $log.log('bus stop call:', $stateParams);
          if($stateParams.lat && $stateParams.lng) return $http.get(`/api/bus-stops?lat=${$stateParams.lat}&lng=${$stateParams.lng}`).then(
            res => {
              $log.log('bus stops success:', res.data.data.stops);
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

        $log.log('%cbusStops:', 'background:yellow', busStops);

        let mapCenterTimeout;

        const gmap = map.gmap;

        let mapCenterListener = gmap.addListener('center_changed', () => {
          const center = gmap.getCenter()
          $log.log('center:', center);
          $timeout.cancel(mapCenterTimeout);
          mapCenterTimeout = $timeout(() => {
            $log.log('%cmapCenterTimeout!', 'background:aqua')
            $state.go('main', {
              lat: String(center.lat()),
              lng: String(center.lng())
            }, {
              // reload: true,
              // inherit: false,
              // notify: true
            })}, 500
          );
        });

        $scope.$on('$destroy', () => {
          $log.log('main js destroy');
          $timeout.cancel(mapCenterTimeout);
          $window.google.maps.event.removeListener(mapCenterListener);
        });
      },
      template: '<map></map><user-location-marker></user-location-marker><bus-stops stops="busStops"></bus-stops>'
    // })
    // .state('main.bus-stops', {
    //   url: '',
    //   resolve: {
    //     busStops: ($stateParams, $q, $log, busTime) => {
    //
    //       if($stateParams.lat && $stateParams.lng) return busTime.getBusStops($stateParams.lat, $stateParams.lng).then(
    //         res => {
    //           $log.log('bus stops success:', res);
    //           return $q.when(res.data.data.stops);
    //         },
    //         res => {
    //           $log.error('error loading bus stops:', res);
    //           return $q.when([]);
    //         }
    //       );
    //       return $q.when([]);
    //     }
    //   },
    //   controller: ($scope, $timeout, $state, $log, busStops, map) => {
    //
    //     $scope.busStops = busStops;
    //
    //     let mapCenterTimeout;
    //
    //     const gmap = map.gmap;
    //
    //     const mapCenterListener = gmap.addListener('center_changed', () => {
    //       const center = gmap.getCenter()
    //       $log.log('center:', center);
    //       $timeout.cancel(mapCenterTimeout);
    //       $timeout(() => $state.go('main.bus-stops',{
    //         lat: center.lat(),
    //         lng: center.lng()
    //       }, {
    //         reload: true
    //       }), 500);
    //     });
    //
    //     $scope.$on('$destroy', () => {
    //       $timeout.cancel(mapCenterTimeout);
    //       $window.google.maps.event.removeListener(mapCenterListener);
    //     });
    //   },
    //   template: '<user-location-marker></user-location-marker><bus-stops stops="busStops"></bus-stops>'
    });
});
