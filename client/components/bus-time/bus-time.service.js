'use strict';

angular.module('mtabusApp')
  .factory('busTime', function (
    $http,
    $log
  ) {

    const busTime = {};

    const getRoutes = () => $http.get('/api/routes');

    const getRoute = routeId => $http.get(`/api/routes/${routeId}`);

    const getBusStops = (lat, lng, span) => {

      let path = `/api/bus-stops?lat=${lat}&lng=${lng}`;
      if(span) path += `&span=${span}`;
      return $http.get(path);
    };

    const getBusStop = id => $http.get(`/api/single-bus-stops?id=${id}`);

    const getBuses = (operator, route, stop) => {
      // console.log('callin dem busses:', operator, route, stop);
      return $http.get(`/api/vehicles-on-routes?operator=${operator}&route=${route}&stop=${stop}`);
    };

    busTime.getRoutes = getRoutes;
    busTime.getRoute = getRoute;
    busTime.getBusStops = getBusStops;
    busTime.getBusStop = getBusStop;
    busTime.getBuses = getBuses;

    return busTime;
  });
