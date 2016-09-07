'use strict';

angular.module('mtabusApp')
  .service('singleBusStop', function ($log, $q, busTime) {

    const singleBusStop = {};

    const decorateRouteWithMonitoredVehicleJourney = (data, busStop) => {
      const { MonitoredStopVisit } = data.data.Siri.ServiceDelivery.StopMonitoringDelivery[0];
      if(MonitoredStopVisit && MonitoredStopVisit.length) {
        Object.assign(_.find(busStop.routes, {shortName: MonitoredStopVisit[0].MonitoredVehicleJourney.PublishedLineName}), { MonitoredStopVisit });
      }
    };

    const decorateStopWithRouteData = busStop => $q.all(busStop.routes.map(route => busTime.getBuses(
      route.agency.id,
      route.shortName,
      busStop.id
    ))).then(
      ary => ary.forEach(data => decorateRouteWithMonitoredVehicleJourney(data, busStop))
    );

    singleBusStop.decorateStopWithRouteData = decorateStopWithRouteData;

    return singleBusStop;
  });
