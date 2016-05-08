'use strict';

angular.module('mtabusApp')
  .controller('BusStopsCtrl', function (
    $scope,
    $log,
    $http
  ) {

    $log.log('bus stops here');

    // $http.get('http://bustime.mta.info/api/where/stops-for-location.json?lat=40.748433&lon=-73.985656&latSpan=0.005&lonSpan=0.005&key=71f7d3b8-d9d5-4791-aeec-f95564ff0bb4').then(
    //   res => {
    //     $log.log('got it', res);
    //   },
    //   res => {
    //     $log.log('failure!', res)
    //   }
    // );
    $http.get('/api/bus-stops').then(
      res => {
        $log.log('WOOHOO', res);
      },
      res => {
        $log.error('NOPE', res);
      }
    );
  });
