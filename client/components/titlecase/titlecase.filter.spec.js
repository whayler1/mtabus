'use strict';

describe('Filter: titlecase', function () {

  // load the filter's module
  beforeEach(module('mtabusApp'));

  // initialize a new instance of the filter before each test
  var titlecase;
  beforeEach(inject(function ($filter) {
    titlecase = $filter('titlecase');
  }));

  it('should return the input prefixed with "titlecase filter:"', function () {
    var text = 'angularjs';
    expect(titlecase(text)).to.equal('titlecase filter: ' + text);
  });

});
