'use strict';

angular.module('mtabusApp')
  .filter('direction', function () {
    const directions = {
      N: 'North',
      NE: 'Northeast',
      E: 'East',
      SE: 'Southeast',
      S: 'South',
      SW: 'Southwest',
      W: 'West',
      NW: 'Northwest'
    };
    return input => input in directions ? directions[input] : input;
  });
