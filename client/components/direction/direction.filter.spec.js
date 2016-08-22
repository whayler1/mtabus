'use strict';

describe('Filter: direction', function () {

  // load the filter's module
  beforeEach(module('mtabusApp'));

  // initialize a new instance of the filter before each test
  var direction;
  beforeEach(inject(function ($filter) {
    direction = $filter('direction');
  }));

  it('should return the input prefixed with "direction filter:"', function () {
    var text = 'angularjs';
    expect(direction(text)).to.equal('direction filter: ' + text);
  });

});
