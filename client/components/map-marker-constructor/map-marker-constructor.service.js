'use strict';

angular.module('mtabusApp')
  .factory('mapMarkerConstructor', function (
    $window,
    $log
  ) {

    const mapMarkerConstructor = {};

    if(!_.hasIn($window, 'google')) $log.error('no google object');

    const GoogleOverlayView = function(element, latlng) {
      this.element = element[0];
      this.latlng = latlng;
    };

    GoogleOverlayView.prototype = new $window.google.maps.OverlayView();
    GoogleOverlayView.prototype.draw = function() {
      const panes = this.getPanes();
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      const { element } = this;
      if (point) {
        element.style.left = `${point.x}px`;
        element.style.top = `${point.y}px`;
      }
      panes.overlayImage.appendChild(element);
    };
    GoogleOverlayView.prototype.onRemove = function() {
      console.log('onRemove', this);
      this.element.parentNode.removeChild(this.element);
      this.element = null;
      this.setMap(null);
    };

    mapMarkerConstructor.GoogleOverlayView = GoogleOverlayView;

    return mapMarkerConstructor;
  });
