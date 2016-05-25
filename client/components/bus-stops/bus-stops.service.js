'use strict';

angular.module('mtabusApp')
  .factory('busStops', function (
    map,
    busTime
  ) {

    const busStops = {};

    const stops = [];

    const gmap = map.gmap;

    const onBoundsChanged = _.debounce(() => {

      const center = gmap.getCenter();
      busTime.getBusStops(center.lat(), center.lng(), map.getSpan()).then(
        res => {
          const newStops = res.data.data.stops;
          console.log('SUCCESS!', newStops);
          angular.copy(newStops, stops);
        },
        res => console.log('FAIL!', res)
      );
    }, 250);

    const mapBoundsChangeListener = gmap.addListener('bounds_changed', onBoundsChanged);

    busStops.stops = stops;

    return busStops;
  });
