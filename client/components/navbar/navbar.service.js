'use strict';

angular.module('mtabusApp')
  .service('navbar', function () {

    const navbar = {};

    navbar.isSearchExpanded = false;
    navbar.inputs = {
      search: ''
    };

    return navbar;
  });
