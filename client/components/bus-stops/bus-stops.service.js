'use strict';

angular.module('mtabusApp')
  .factory('busStops', function (
    map,
    mapMarkerConstructor,
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
          _.remove(stops, stop => {
            const removeStop = !_.find(stopsInView, {id:stop.id});
            return removeStop;
          });

          stopsInView.forEach(stop => {
            if(!(_.find(stops, {id:stop.id}))) {
              stops.push(stop);
            }
          });
        },
        res => console.log('FAIL!', res)
      );
    }, 500);

    const mapBoundsChangeListener = gmap.addListener('bounds_changed', onBoundsChanged);

    busStops.stops = stops;

    return busStops;
  });
