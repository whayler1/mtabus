'use strict';

angular.module('mtabusApp')
  .controller('MapCtrl', function (
    $scope,
    $stateParams,
    $element,
    $window,
    $log,
    $timeout,
    $q,
    map
  ) {

    const gmap = map.gmap;

    const addMap = () => $element.replaceWith(map.gmapEl);

    addMap();
    map.redraw();

    // if(_.hasIn($window, 'navigator') && _.hasIn($window.navigator, 'geolocation')) {
    //
    //   $window.navigator.geolocation.getCurrentPosition(
    //     position => {
    //       $log.log('%cposition:', 'background:mocassin', position);
    //       const coords = position.coords;
    //
    //       addMap();
    //       map.redraw();
    //
    //       gmap.panTo({
    //         lat: coords.latitude,
    //         lng: coords.longitude
    //       });
    //     },
    //     res => {
    //       $log.warn('geoloc denied');
    //       addMap();
    //     },
    //     {
    //       enableHighAccuracy: true
    //     }
    //   );
    // }else {
    //   addMap();
    // }
  });
