'use strict';

describe('Service: mapMarkerConstructor', function () {

  // load the service's module
  beforeEach(module('mtabusApp'));

  // instantiate service
  var mapMarkerConstructor;
  beforeEach(inject(function (_mapMarkerConstructor_) {
    mapMarkerConstructor = _mapMarkerConstructor_;
  }));

  it('should do something', function () {
    expect(!!mapMarkerConstructor).to.be.true;
  });

});
