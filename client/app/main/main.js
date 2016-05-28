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
        buses: ($q, $log, $stateParams, busTime) => busTime.getBuses($stateParams.operator, $stateParams.route).then(
          res => {
            const vehicleMonitoringDelivery = res.data.Siri.ServiceDelivery.VehicleMonitoringDelivery;
            const buses = vehicleMonitoringDelivery.length? vehicleMonitoringDelivery[0].VehicleActivity : [];
            $log.log('%crouteSucces!', 'background:lightblue', buses);
            if(vehicleMonitoringDelivery.length > 1) {
              $log.warn('vehicleMonitoringDelivery has more then one item');
            }
            return $q.when(buses);
          },
          res => {
            $log.error('route FAILURE', res)
            return $q.when({error: true});
          }
        )
      },
      controller: ($scope, buses) => {
        console.log('on buses!');
        $scope.buses = buses;
      },
      template: '<bus-markers buses="buses"></bus-markers>'
    });
});
