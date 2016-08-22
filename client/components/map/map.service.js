'use strict';

angular.module('mtabusApp')
  .factory('map', function (
    $document,
    $window
  ) {

    const map = {};

    if(!_.hasIn($window, 'google')) $log.error('no google object present');

    const gmapEl = document.createElement('div');
    gmapEl.className = 'gmap';

    const gmap = new $window.google.maps.Map(gmapEl, {
      center: {lat: 40.7128, lng: -74.0059},
      zoom: 18,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: "transit.station.bus",
          stylers: [
            { visibility: "off" }
          ]
        }
      ]
    });

    const redraw = () => $window.google.maps.event.trigger(gmap, 'resize');

    const getSpan = () => {
      const bounds = gmap.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const latDiff = northEast.lat() - southWest.lat();
      const lngDiff = Math.abs(southWest.lng()) - Math.abs(northEast.lng());
      const reqSpan = latDiff > lngDiff? latDiff : lngDiff;
      return reqSpan;
    };

    map.gmap = gmap;
    map.gmapEl = gmapEl;
    map.redraw = redraw;
    map.getSpan = getSpan;

    return map;
  });
