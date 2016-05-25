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
          const stopsInView = [];

          newStops.forEach(stop => {
            const stopLat = stop.lat;
            const stopLng = stop.lon;
            const bounds = gmap.getBounds();
            const northEast = bounds.getNorthEast();
            const southWest = bounds.getSouthWest();

            if(stopLat <= northEast.lat() &&
                stopLat >= southWest.lat() &&
                stopLng <= northEast.lng() &&
                stopLng >= southWest.lng()) {
                  stopsInView.push(stop);
                }
          });
          console.log('stopsInView:', stopsInView);

          angular.copy(stopsInView, stops);
        },
        res => console.log('FAIL!', res)
      );
    }, 250);

    const mapBoundsChangeListener = gmap.addListener('bounds_changed', onBoundsChanged);

    busStops.stops = stops;

    return busStops;
  });
