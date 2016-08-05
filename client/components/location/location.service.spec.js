'use strict';

describe('Service: location', function () {

  // load the service's module
  beforeEach(module('mtabusApp'));

  // instantiate service
  var location;
  beforeEach(inject(function (_location_) {
    location = _location_;
  }));

  it('should do something', function () {
    expect(!!location).to.be.true;
  });

});
