'use strict';

angular.module('mtabusApp')
  .factory('mapMarkerConstructor', function (
    $window,
    $log
  ) {

    const mapMarkerConstructor = {};

    if(!_.hasIn($window, 'google')) $log.error('no google object');

    const GoogleOverlayView = function(element, latlng) {
      this.element = element;
      this.latlng = latlng;
    };

    GoogleOverlayView.prototype = new $window.google.maps.OverlayView();
    GoogleOverlayView.prototype.draw = function() {
      let panes = this.getPanes();
      let point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      panes.overlayImage.appendChild(this.element[0]);
      if (point) {
        this.element.css('left', point.x + 'px');
        this.element.css('top', point.y + 'px');
      }
    };
    GoogleOverlayView.prototype.onRemove = function() {
      // console.log('onRemove', this);
      // this.setMap(null);
    };

    mapMarkerConstructor.GoogleOverlayView = GoogleOverlayView;

    return mapMarkerConstructor;
  });
