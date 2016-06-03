'use strict';

describe('Service: busesList', function () {

  // load the service's module
  beforeEach(module('mtabusApp'));

  // instantiate service
  var busesList;
  beforeEach(inject(function (_busesList_) {
    busesList = _busesList_;
  }));

  it('should do something', function () {
    expect(!!busesList).to.be.true;
  });

});
