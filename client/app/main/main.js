'use strict';

angular.module('mtabusApp').config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      abstract: true,
      template: '<navbar></navbar><map></map><user-location-marker></user-location-marker><bus-stops></bus-stops><user-location-button></user-location-button><ui-view></ui-view>'
    })
    .state('main.bus-stops', {
      url: '',
      controller: ($scope, $window, location, map) => {
        const stateChangeSuccessListener = $scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
          if(!fromState.name) {
            location.getCoords.then(
              coords => {
                map.gmap.setCenter(new $window.google.maps.LatLng(
                  coords.latitude,
                  coords.longitude
                ));
              }
            );
          }
          stateChangeSuccessListener();
        });
      },
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
      template: '<single-bus-stop bus-stop="busStop"></single-bus-stop><ui-view></ui-view>'
    })
    .state('main.bus-stop.buses', {
      url: '/:operator/:route',
      resolve: {
        buses: ($q, $log, $stateParams, busesList) => busesList.getBuses(
          $stateParams.operator,
          $stateParams.route,
          $stateParams.id
        ).then(
          buses => {
            busesList.watch(
              $stateParams.operator,
              $stateParams.route,
              $stateParams.id
            );
            return $q.when(buses);
          }
        )
      },
      // onExit: (busesList) => busesList.unwatch(),
      controller: ($scope, $stateParams, buses, busesList, busStop) => {
        $scope.buses = buses;
        console.log('buses:', buses);
        console.log('busStop:', busStop);
        $scope.route = _.find($scope.busStop.routes, {shortName:$stateParams.route})
        console.log('route:', $scope.route);

        $scope.$on('$stateChangeStart', () => {
          console.log('leaving buses list');
          busesList.unwatch();
          $scope.buses.length = 0;
        });
      },
      template: '<buses-list buses="buses" bus-stop="busStop"></buses-list><bus-marker ng-repeat="bus in buses" bus="bus" route="route"></bus-marker>'
    });
});
