'use strict';

angular.module('mtabusApp')
  .service('location', function (
    $window,
    $log,
    $q
  ) {

    const location = {};

    let locationWatcher;
    const coords = {};
    const hasCoords = () => _.hasIn('latitude'. coords);
    let deferred = $q.defer();

    if(_.hasIn($window, 'navigator') && _.hasIn($window.navigator, 'geolocation')) {

      locationWatcher = $window.navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          angular.copy({
            latitude,
            longitude
          }, coords);
          deferred.resolve(coords)

          $log.log('---watchPos:', coords);
        },
        res => {
          $log.warn('watch position fail');
          deferred.reject(res);
        },
        {
          enableHighAccuracy: true
        }
      );
    }

    location.getCoords = deferred.promise;
    location.hasCoords = hasCoords;

    return location;
  });
