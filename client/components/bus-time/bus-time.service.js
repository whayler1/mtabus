'use strict';

angular.module('mtabusApp')
  .factory('busTime', function (
    $http,
    $log
  ) {

    const busTime = {};

    const getBusStops = (lat, lng, span) => {

      let path = `/api/bus-stops?lat=${lat}&lng=${lng}`;
      if(span) path += `&span=${span}`;
      return $http.get(path);
    };

    const getBusStop = id => $http.get(`/api/single-bus-stops?id=${id}`);

    busTime.getBusStops = getBusStops;
    busTime.getBusStop = getBusStop;

    return busTime;
  });
