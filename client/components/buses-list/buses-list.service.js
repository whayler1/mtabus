'use strict';

angular.module('mtabusApp')
  .factory('busesList', function (
    $q,
    $timeout,
    busTime
  ) {

    const busesList = {};

    const buses = [];

    let watchTimeout;
    let shouldWatch;

    const getBuses = (operator, route, stop) => busTime.getBuses(operator, route, stop).then(
      res => {
        const stopMonitoringDelivery = res.data.Siri.ServiceDelivery.StopMonitoringDelivery;
        const newBuses = stopMonitoringDelivery.length? stopMonitoringDelivery[0].MonitoredStopVisit : [];
        _.remove(buses, bus => {
          const { DatedVehicleJourneyRef } = bus.MonitoredVehicleJourney.FramedVehicleJourneyRef;
          const shouldRemove = !_.find(newBuses, {MonitoredVehicleJourney:{FramedVehicleJourneyRef:{DatedVehicleJourneyRef:DatedVehicleJourneyRef}}});
          // console.log('%c shouldRemove:', 'background:yellow', shouldRemove);
          return shouldRemove;
        });
        newBuses.forEach(bus => {
          const { DatedVehicleJourneyRef } = bus.MonitoredVehicleJourney.FramedVehicleJourneyRef;
          const existingBus = _.find(buses, {MonitoredVehicleJourney:{FramedVehicleJourneyRef:{DatedVehicleJourneyRef:DatedVehicleJourneyRef}}});
          if(existingBus) {
            // console.log('%c existingBus', 'background:aqua');
            angular.copy(bus.MonitoredVehicleJourney, existingBus.MonitoredVehicleJourney);
          }else {
            console.log('%c new bus', 'background:lightblue');
            buses.push(bus);
          }
        });
        console.log('%c buses updated:', 'background:orange', buses[0].MonitoredVehicleJourney.VehicleLocation.Latitude);
        // angular.copy(newBuses, buses);
        return $q.when(buses);
      }
    );

    const watch = (operator, route, stop) => {
      // console.log('%cwatch', 'background:purple');
      $timeout.cancel(watchTimeout);
      shouldWatch = true;
      watchTimeout = $timeout(() => getBuses(operator, route, stop).then(() => {
        if(shouldWatch) watch(operator, route, stop);
      }), 3000);
    };

    const unwatch = () => {
      buses.length = 0;
      $timeout.cancel(watchTimeout);
      shouldWatch = false;
    };

    busesList.getBuses = getBuses;
    busesList.watch = watch;
    busesList.unwatch = unwatch;

    return busesList;
  });
