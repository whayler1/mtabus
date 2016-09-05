'use strict';

angular.module('mtabusApp')
  .factory('busStops', function (
    $rootScope,
    $log,
    map,
    mapMarkerConstructor,
    busTime,
    analytics
  ) {

    const busStops = {};

    const stops = [];

    const gmap = map.gmap;

    let isZoomValid = true;
    let hasZoomInvalidFiredOnce = false;

    const onBoundsChanged = _.debounce(() => {
      $log.log('%c on bounds changed', 'background:yellow');
      const center = gmap.getCenter();
      busTime.getBusStops(center.lat(), center.lng(), map.getSpan()).then(
        res => {
          if(isZoomValid) {
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
            $log.log('%c stops:', 'background:pink', stops);
          }
        },
        res => console.log('FAIL!', res)
      );
    },
    250,
    {
      maxWait: 500
    });

    const onZoomChanged = () => {
      const span = map.getSpan()
      $log.log('span:', span);
      if(gmap.getZoom() < 16 && span > 0.01) {
        if(isZoomValid) {
          if(!hasZoomInvalidFiredOnce) {
            hasZoomInvalidFiredOnce = true;
            analytics.track('zoom-invalid');
          }
          isZoomValid = false;
          google.maps.event.clearListeners(gmap, 'bounds_changed');
          stops.length = 0;
          $rootScope.$emit('bus-stop-zoom-invalid');
          $log.log('%c zoom invalid', 'background:lightblue', busStops.stops);
        }
      }else if(!isZoomValid) {
        $log.log('%c zoom invalid', 'background:pink');
        isZoomValid = true;
        $rootScope.$emit('bus-stop-zoom-valid');
        gmap.addListener('bounds_changed', onBoundsChanged);
        onBoundsChanged();
      }
    };

    gmap.addListener('zoom_changed', onZoomChanged);
    gmap.addListener('bounds_changed', onBoundsChanged);

    busStops.stops = stops;
    busStops.isZoomValid = () => isZoomValid;

    return busStops;
  });
