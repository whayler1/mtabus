'use strict';

angular.module('mtabusApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    scope: {
      search: '=',
      isSearchExpanded: '='
    },
    controller: 'NavbarController'
  }));
