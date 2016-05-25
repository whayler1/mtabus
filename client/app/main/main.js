'use strict';

angular.module('mtabusApp').config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      abstract: true,
      template: '<navbar></navbar><map></map><user-location-marker></user-location-marker><bus-stops></bus-stops><ui-view></ui-view>'
    })
    .state('main.bus-stops', {
      url: '',
      // resolve: {
      //   busStops: (
      //     $stateParams,
      //     $q,
      //     $log,
      //     $timeout,
      //     $http,
      //     busTime,
      //     map
      //   ) => {
      //
      //     const lat = $stateParams.lat;
      //     const lng = $stateParams.lng;
      //
      //     let mapTilesListener = map.gmap.addListener('tilesloaded', () => {
      //       google.maps.event.removeListener(mapTilesListener);
      //       const bounds = map.gmap.getBounds();
      //       const northEast = bounds.getNorthEast();
      //       const southWest = bounds.getSouthWest();
      //       const latDiff = northEast.lat() - southWest.lat();
      //       const lngDiff = Math.abs(southWest.lng()) - Math.abs(northEast.lng());
      //       const reqSpan = latDiff > lngDiff? latDiff : lngDiff;
      //       console.log('bounds:', latDiff, lngDiff)
      //       console.log('reqSpan:', reqSpan);
      //     });
      //
      //
      //     if(lat && lng) return busTime.getBusStops(lat, lng).then(
      //       res => {
      //         $log.log('%cbus stops success', 'background:lightgreen');
      //         return $q.when(_.orderBy(res.data.data.stops, ['name']));
      //       },
      //       res => {
      //         $log.error('error loading bus stops:', res);
      //         return $q.when([]);
      //       }
      //     );
      //     $log.log('no bus stop lat lng');
      //     return $q.when([]);
      //   }
      // },
      // controller: (
      //   $scope,
      //   $rootScope,
      //   $timeout,
      //   $state,
      //   $log,
      //   $window,
      //   busStops,
      //   map
      // ) => {
      //
      //   $scope.busStops = busStops;
      //
      //   $log.log('%cbus stops:', 'background:yellow', busStops);
      //
      //   let mapCenterTimeout;
      //
      //   const gmap = map.gmap;
      //
      //   let mapCenterListener = gmap.addListener('center_changed', () => {
      //     const center = gmap.getCenter()
      //
      //     $timeout.cancel(mapCenterTimeout);
      //     mapCenterTimeout = $timeout(() => {
      //       $log.log('%cmapCenterTimeout!', 'background:aqua')
      //       $state.go($state.current.name, {
      //         lat: String(center.lat()),
      //         lng: String(center.lng())
      //       })}, 250);
      //   });
      //
      //   /**
      //    * JW: This is a hacky way of being sure all the bus stops get cleared
      //    * before state change. Should revisit and make smoother.
      //    */
      //   const stateChangeStartListener = $rootScope.$on('$stateChangeStart', () => busStops.length = 0);
      //
      //   $scope.$on('$destroy', () => {
      //
      //     stateChangeStartListener();
      //     $timeout.cancel(mapCenterTimeout);
      //     $window.google.maps.event.removeListener(mapCenterListener);
      //   });
      // },
      template: '<bus-stop-list></bus-stop-list><ui-view></ui-view>'
    })
    .state('main.bus-stop', {
      url: ':id',
      resolve: {
        busStop: ($q, $log, $stateParams, busTime) => busTime.getBusStop($stateParams.id).then(
          res => {
            $log.log('%csingle bus stop!', 'background:magenta', res.data.data);
            return $q.when(res.data.data);
          },
          res => {
            $log.error('FAIL loading single bus stop :(', res);
            return $q.when({error: true});
          }
        )
      },
      controller: ($scope, busStop) => {
        $scope.busStop = busStop;
      },
      template: '<single-bus-stop bus-stop="busStop"></single-bus-stop>'
    });
});
