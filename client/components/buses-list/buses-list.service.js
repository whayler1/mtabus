'use strict';

angular.module('mtabusApp')
  .factory('busesList', function (
    $q,
    $log,
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
          if('MonitoredVehicleJourney' in bus) {
            const { DatedVehicleJourneyRef } = bus.MonitoredVehicleJourney.FramedVehicleJourneyRef;
            const shouldRemove = !_.find(newBuses, {MonitoredVehicleJourney:{FramedVehicleJourneyRef:{DatedVehicleJourneyRef:DatedVehicleJourneyRef}}});
            return shouldRemove;
          }
          return true;
        });
        if(angular.isArray(newBuses)) {
            newBuses.forEach(bus => {
            const { DatedVehicleJourneyRef } = bus.MonitoredVehicleJourney.FramedVehicleJourneyRef;
            const existingBus = _.find(buses, {MonitoredVehicleJourney:{FramedVehicleJourneyRef:{DatedVehicleJourneyRef:DatedVehicleJourneyRef}}});
            if(existingBus) {
              angular.copy(bus.MonitoredVehicleJourney, existingBus.MonitoredVehicleJourney);
            }else {
              buses.push(bus);
            }
          });
        }
        busesList.lastUpdated = new Date();
        return $q.when(buses);
      }
    );

    const watch = (operator, route, stop) => {
      $log.log('%cwatch', 'background:pink');
      busesList.lastUpdated = new Date();
      $timeout.cancel(watchTimeout);
      shouldWatch = true;
      watchTimeout = $timeout(() => getBuses(operator, route, stop).then(() => {
        if(shouldWatch) watch(operator, route, stop);
      }), 7000);
    };

    const unwatch = () => {
      buses.length = 0;
      $timeout.cancel(watchTimeout);
      shouldWatch = false;
    };

    busesList.lastUpdated = new Date();
    busesList.getBuses = getBuses;
    busesList.watch = watch;
    busesList.unwatch = unwatch;

    return busesList;
  });
