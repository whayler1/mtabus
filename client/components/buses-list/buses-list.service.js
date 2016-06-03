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
        angular.copy(newBuses, buses);
        return $q.when(buses);
      }
    );

    const watch = (operator, route, stop) => {
      console.log('%cwatch', 'background:purple');
      $timeout.cancel(watchTimeout);
      shouldWatch = true;
      watchTimeout = $timeout(() => getBuses(operator, route, stop).then(() => {
        if(shouldWatch) watch(operator, route, stop);
      }), 2500);
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
