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
    // console.log('foo:', $element.find('gmap')[0]);
    const gmap = new $window.google.maps.Map(gmapEl, {
      center: {lat: 40.7128, lng: -74.0059},
      zoom: 18
    });

    const redraw = () => $window.google.maps.event.trigger(gmap, 'resize');

    map.gmap = gmap;
    map.gmapEl = gmapEl;
    map.redraw = redraw;

    return map;
  });
