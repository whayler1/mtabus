'use strict';

angular.module('mtabusApp')
  .controller('MapCtrl', function (
    $scope,
    $element,
    map
  ) {

    // console.log('foo:', $element.find('gmap')[0]);
    const gmap = new google.maps.Map($element.find('gmap')[0], {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
  });
