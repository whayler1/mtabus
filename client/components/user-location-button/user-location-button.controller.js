'use strict';

angular.module('mtabusApp')
  .controller('UserLocationButtonCtrl', function (
    $scope,
    $window,
    map
  ) {

    const hasGeoloc = (_.hasIn($window, 'navigator') && _.hasIn($window.navigator, 'geolocation'));

    $scope.onClick = () => {
      console.log('click');
      if(hasGeoloc) {

      }
    };
  });
