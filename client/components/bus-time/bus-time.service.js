'use strict';

angular.module('mtabusApp')
  .factory('busTime', function (
    $http,
    $log
  ) {

    const busTime = {};

    const getBusStops = (lat, lng) => {
      console.log('%cget bus stops', 'background:aqua', lat, lng);
      return $http.get(`/api/bus-stops?lat=${lat}&lng=${lng}`);
    }

    busTime.getBusStops = getBusStops;

    return busTime;
  });
