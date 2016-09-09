'use strict';

angular.module('mtabusApp')
  .service('singleBusStop', function (
    $log,
    $q,
    $timeout,
    busTime
  ) {

    const singleBusStop = {};

    let decorateTimeout;
    let shouldPoll = false;
    let currentBusStop;

    const decorateRouteWithMonitoredVehicleJourney = (data, busStop, index) => {
      const { MonitoredStopVisit } = data.data.Siri.ServiceDelivery.StopMonitoringDelivery[0];
      const route = busStop.routes[index];
      $log.log('MonitoredStopVisit', MonitoredStopVisit);
      if(MonitoredStopVisit && MonitoredStopVisit.length) {
        Object.assign(route, { MonitoredStopVisit });
      }else {
        route.MonitoredStopVisit = {};
      }
    };

    const decorateStopWithRouteData = busStop => $q.all(busStop.routes.map(route => busTime.getBuses(
      route.agency.id,
      route.shortName,
      busStop.id
    ))).then(
      ary => {
        if(shouldPoll && busStop === currentBusStop) {
          ary.forEach((data, index) => decorateRouteWithMonitoredVehicleJourney(data, busStop, index));
          decorateTimeout = $timeout(() => decorateStopWithRouteData(busStop), 7000);
        }
      },
      err => $log.error('decorateStopWithRouteData error') // bubble error to ui here
    );

    const startRouteDataPolling = busStop => {
      currentBusStop = busStop;
      shouldPoll = true;
      decorateStopWithRouteData(busStop);
    };

    const stopRouteDataPolling = () => {
      currentBusStop = undefined;
      shouldPoll = false;
      $timeout.cancel(decorateTimeout);
    };

    singleBusStop.startRouteDataPolling = startRouteDataPolling;
    singleBusStop.stopRouteDataPolling = stopRouteDataPolling;

    return singleBusStop;
  });
